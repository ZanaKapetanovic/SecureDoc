from cryptography.hazmat.primitives.ciphers.aead import AESGCM
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
import os
import base64
import logging
import json

logger = logging.getLogger(__name__)

class DocumentProcessor:
    def __init__(self):
        """Initialize the document processor with secure random values"""
        # Generate a random 32-byte key for AES-256
        self.key = AESGCM.generate_key(bit_length=256)
        self.aesgcm = AESGCM(self.key)
        logger.info("DocumentProcessor initialized with new AES-256 key")
    
    def _generate_salt(self):
        """Generate a random salt for hashing"""
        return os.urandom(16)
    
    def _hash_data(self, data, salt):
        """Create SHA-256 hash of the data with salt"""
        hasher = hashes.Hash(hashes.SHA256())
        hasher.update(salt + data)
        return hasher.finalize()
    
    def secure_document(self, file_data):
        """Encrypt the document using AES-256-GCM with authentication"""
        try:
            # Generate a random 96-bit nonce (12 bytes) for AES-GCM
            nonce = os.urandom(12)
            
            # Generate salt for hashing
            salt = self._generate_salt()
            
            # Create hash of original data
            data_hash = self._hash_data(file_data, salt)
            
            # Encrypt the data
            encrypted_data = self.aesgcm.encrypt(nonce, file_data, None)
            
            # Combine all the necessary components
            security_package = {
                "salt": base64.b64encode(salt).decode('utf-8'),
                "nonce": base64.b64encode(nonce).decode('utf-8'),
                "key": base64.b64encode(self.key).decode('utf-8'),
                "hash": base64.b64encode(data_hash).decode('utf-8'),
                "data": base64.b64encode(encrypted_data).decode('utf-8')
            }
            
            # Encode the entire package
            combined_data = base64.b64encode(
                json.dumps(security_package).encode('utf-8')
            )
            
            logger.info("Document encrypted successfully with AES-256-GCM")
            return combined_data
            
        except Exception as e:
            logger.error(f"Error encrypting document: {str(e)}")
            raise
    
    def unlock_document(self, encrypted_data):
        """Decrypt the document and verify its integrity"""
        try:
            # Decode the security package
            security_package = json.loads(
                base64.b64decode(encrypted_data).decode('utf-8')
            )
            
            # Extract components
            salt = base64.b64decode(security_package['salt'])
            nonce = base64.b64decode(security_package['nonce'])
            key = base64.b64decode(security_package['key'])
            stored_hash = base64.b64decode(security_package['hash'])
            encrypted_data = base64.b64decode(security_package['data'])
            
            # Create AESGCM instance with the stored key
            aesgcm = AESGCM(key)
            
            # Decrypt the data
            decrypted_data = aesgcm.decrypt(nonce, encrypted_data, None)
            
            # Verify data integrity
            computed_hash = self._hash_data(decrypted_data, salt)
            if not computed_hash == stored_hash:
                raise ValueError("Data integrity check failed")
            
            logger.info("Document decrypted and verified successfully")
            return decrypted_data
            
        except Exception as e:
            logger.error(f"Error decrypting document: {str(e)}")
            raise 