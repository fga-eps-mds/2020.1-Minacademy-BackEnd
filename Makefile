build:
	docker-compose up --build

run:
	docker-compose up

start:
	docker-compose start

stop:
	docker-compose stop

list:
	docker-compose ps

npm:
	docker-compose exec server npm install $(pacote)

npm-dev:
	docker-compose exec server npm install -D $(pacote)

yarn:
	docker-compose exec server yarn add $(pacote)

yarn-dev:
	docker-compose exec server yarn add --dev $(pacote)