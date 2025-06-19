# Use Alpine Linux as base image
FROM alpine:3.18

# Install required packages
RUN apk add --no-cache \
    nginx \
    nginx-mod-http-modsecurity \
    curl \
    wget \
    libmodsecurity \
    libmodsecurity-dev \
    git

# Create necessary directories
RUN mkdir -p /etc/nginx/modsec /var/log/modsecurity

# Download and install OWASP ModSecurity Core Rule Set (CRS)
RUN cd /etc/nginx/modsec && \
    git clone https://github.com/coreruleset/coreruleset.git && \
    mv coreruleset/crs-setup.conf.example /etc/nginx/modsec/crs-setup.conf && \
    mv coreruleset/rules/ /etc/nginx/modsec/ && \
    rm -rf coreruleset

# Copy ModSecurity and Nginx configurations
COPY modsec/main.conf /etc/nginx/modsec/
COPY nginx.conf /etc/nginx/nginx.conf

# Create SSL directory
RUN mkdir -p /etc/nginx/ssl

# Generate self-signed SSL certificate for development
RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout /etc/nginx/ssl/server.key \
    -out /etc/nginx/ssl/server.crt \
    -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"

# Create nginx user and group
RUN adduser -D -g 'www' www

# Set proper permissions
RUN chown -R www:www /var/lib/nginx && \
    chown -R www:www /var/log/nginx && \
    chown -R www:www /etc/nginx/modsec && \
    chown -R www:www /var/log/modsecurity

# Forward logs to Docker log collector
RUN ln -sf /dev/stdout /var/log/nginx/access.log && \
    ln -sf /dev/stderr /var/log/nginx/error.log && \
    ln -sf /dev/stderr /var/log/modsec_audit.log

# Expose ports
EXPOSE 80 443

# Start Nginx
CMD ["nginx", "-g", "daemon off;"] 