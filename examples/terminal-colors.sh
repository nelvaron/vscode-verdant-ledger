#!/usr/bin/env sh
# Print the 16 ANSI colors as the integrated terminal renders them.
# Run it in a VS Code terminal: sh examples/terminal-colors.sh

names="black red green yellow blue magenta cyan white"

row() {
  base=$1
  label=$2
  printf '%-8s' "$label"
  i=0
  for name in $names; do
    printf '\033[%sm %-8s\033[0m' "$((base + i))" "$name"
    i=$((i + 1))
  done
  printf '\n'
}

row 30 normal
row 90 bright
printf '\n\033[1mbold\033[0m  \033[3mitalic\033[0m  \033[4munderline\033[0m  \033[2mdim\033[0m\n'
