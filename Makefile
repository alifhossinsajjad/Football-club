test:
	@echo "Running tests..."
	docker build --no-cache -t softvence/caroline-admin:latest .
build:
	@echo "Building..."
	docker compose --profile prod build --no-cache

prod:
	@echo "Building production image..."
	docker compose --profile prod up -d

