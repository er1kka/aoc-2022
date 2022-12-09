FROM denoland/deno:latest
WORKDIR /app
USER deno
COPY *.ts ./
COPY input.txt .
RUN deno cache index.ts
RUN deno cache puzzle.ts
RUN mkdir -p /var/tmp/log
CMD ["run", "--allow-all", "index.ts"]