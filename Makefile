SHELL := /bin/bash

.PHONY: install dev build lint test ci clean

install:
	pnpm install

dev:
	pnpm dev

build:
	pnpm build

lint:
	pnpm lint

test:
	pnpm test

ci:
	pnpm ci

clean:
	rm -rf node_modules .turbo */*/node_modules */*/dist */*/build