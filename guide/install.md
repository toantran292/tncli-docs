# Install

## Requirements

- macOS or Linux
- `tmux`, `git`, `docker`, `zsh`
- Go 1.26+ (only for building from source)

## Quick install

```bash
curl -fsSL https://raw.githubusercontent.com/toantran292/tncli-releases/main/install.sh | bash
```

This downloads the latest binary for your OS/arch to `~/.local/bin/tncli` and adds it to your PATH.

## Manual install

Download the binary for your platform from the [latest release](https://github.com/toantran292/tncli-releases/releases/latest):

| OS / Arch          | File                              |
| ------------------ | --------------------------------- |
| macOS Apple Silicon| `tncli-darwin-arm64.tar.gz`       |
| macOS Intel        | `tncli-darwin-amd64.tar.gz`       |
| Linux x86_64       | `tncli-linux-amd64.tar.gz`        |
| Linux ARM64        | `tncli-linux-arm64.tar.gz`        |

```bash
tar xzf tncli-darwin-arm64.tar.gz
mv tncli-darwin-arm64 ~/.local/bin/tncli
chmod +x ~/.local/bin/tncli
```

## Verify

```bash
tncli version
```

## Update

```bash
tncli update
```

Fetches latest release and replaces the binary in place.
