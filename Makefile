SHELL := /bin/bash

.PHONY: install dev build lint test clean ci

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

clean:
	rm -rf node_modules **/node_modules .turbo

ci: install lint build test