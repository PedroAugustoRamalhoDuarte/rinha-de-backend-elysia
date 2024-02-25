FROM oven/bun

WORKDIR /app

COPY package.json .
COPY bun.lockb .
COPY prisma prisma

RUN bun install --production

RUN bun prisma generate

COPY src src
COPY tsconfig.json .

ENV NODE_ENV production
CMD ["bun", "src/index.ts"]

EXPOSE 3000