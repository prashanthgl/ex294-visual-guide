import{r as d,j as e}from"./index-V6pXZagA.js";import{P as h,C as n}from"./CodeBlock-ClK0BBrp.js";import{I as r}from"./InfoBox-D5QG7ZYC.js";const t="$";function f(){const[i,a]=d.useState("basics"),l=[{key:"basics",label:"Basics & Variables"},{key:"conditionals",label:"Conditionals"},{key:"loops",label:"Loops"},{key:"functions",label:"Functions & IO"},{key:"analyzing",label:"Analyzing Scripts"},{key:"ansible-shell",label:"Ansible + Shell"}];return e.jsxs("div",{className:"page-container fade-in",children:[e.jsx(h,{title:"Shell Scripting",icon:"$_",description:"Bash scripting fundamentals for the RHCE exam — variables, conditionals, loops, functions, and how to analyze and run scripts with Ansible.",tags:["bash","shell","scripting","conditionals","loops","functions","exit codes"]}),e.jsx("div",{style:{display:"flex",gap:"6px",marginBottom:"1.5rem",flexWrap:"wrap"},children:l.map(s=>e.jsx("button",{onClick:()=>a(s.key),style:{padding:"7px 16px",borderRadius:"var(--radius-md)",border:`1px solid ${i===s.key?"var(--accent-primary)":"var(--border-subtle)"}`,background:i===s.key?"var(--accent-primary-subtle)":"var(--bg-card)",color:i===s.key?"var(--accent-primary)":"var(--text-muted)",fontSize:"0.8rem",fontWeight:600,cursor:"pointer",transition:"all 150ms"},children:s.label},s.key))}),i==="basics"&&e.jsxs(e.Fragment,{children:[e.jsx("h2",{className:"section-title",children:"Shell Basics & Variables"}),e.jsxs(r,{type:"key",children:["The RHCE exam tests your ability to ",e.jsx("strong",{children:"analyze simple shell scripts"}),"— understand what they do, their inputs/outputs, and their exit codes. You may also need to write basic scripts or use Ansible to execute them."]}),e.jsx(n,{language:"bash",filename:"scripts/basics.sh",code:`#!/bin/bash
# Shebang line: tells the OS which interpreter to use
# #!/bin/bash  → bash interpreter
# #!/bin/sh    → POSIX shell (more portable, fewer features)
# #!/usr/bin/env bash  → find bash in PATH (better for portability)

# ── VARIABLES ─────────────────────────────────────────────────
name="Alice"                  # assignment: NO spaces around =
echo "Hello, $name"           # double quotes: variables expand
echo 'Hello, $name'           # single quotes: literal (no expansion)
echo "Hello, ${t}{name}!"        # curly braces: needed when adjacent to text

# ── VARIABLE TYPES ─────────────────────────────────────────────
integer=42
float="3.14"                  # bash treats all as strings; use bc for math
array=("apple" "banana" "cherry")
readonly CONSTANT="fixed"     # can't be changed
export MY_VAR="visible"       # export makes it available to child processes

# ── SPECIAL VARIABLES ─────────────────────────────────────────
echo "$0"    # name of the script itself
echo "$1"    # first argument
echo "$2"    # second argument
echo "$@"    # ALL arguments (as separate words)
echo "$*"    # ALL arguments (as single string)
echo "$#"    # number of arguments
echo "$$"    # PID of current process
echo "$?"    # exit code of last command (0 = success)
echo "$!"    # PID of last background process
echo "$-"    # current shell options (flags)

# ── STRING OPERATIONS ─────────────────────────────────────────
str="Hello, World!"
echo "${t}{#str}"               # length: 13
echo "${t}{str:0:5}"            # substring: Hello (offset:length)
echo "${t}{str:7}"              # substring from position 7
echo "${t}{str,,}"              # lowercase: hello, world!
echo "${t}{str^^}"              # uppercase: HELLO, WORLD!
echo "${t}{str/World/Ansible}"  # replace first occurrence
echo "${t}{str//l/L}"           # replace all occurrences

# ── DEFAULT VALUES ────────────────────────────────────────────
# Use defaults to handle optional variables safely
name="${t}{1:-World}"           # if $1 is empty, use "World"
config="${t}{CONFIG_FILE:-/etc/myapp/config}"   # env var or default path
: "${t}{REQUIRED_VAR:?'REQUIRED_VAR must be set'}"  # fail if not set

# ── ARITHMETIC ────────────────────────────────────────────────
a=10
b=3
echo $((a + b))              # 13  (bash arithmetic)
echo $((a - b))              # 7
echo $((a * b))              # 30
echo $((a / b))              # 3   (integer division!)
echo $((a % b))              # 1   (modulo)
echo $((a ** 2))             # 100 (exponent)

((count++))                  # increment
((count += 5))               # add 5
result=$(echo "scale=2; 10/3" | bc)   # floating point: 3.33

# ── COMMAND SUBSTITUTION ──────────────────────────────────────
current_date=$(date +%Y-%m-%d)       # modern syntax
current_user=\`whoami\`               # old backtick syntax (avoid)
file_count=$(ls /etc/*.conf | wc -l)

echo "Today is $current_date"
echo "Running as: $current_user"
echo "Config files: $file_count"

# ── OUTPUT STREAMS ────────────────────────────────────────────
echo "Normal message"        # stdout (fd 1)
echo "Error message" >&2     # stderr (fd 2)

# Redirect
command > output.txt         # stdout to file (overwrite)
command >> output.txt        # stdout to file (append)
command 2> error.txt         # stderr to file
command &> all.txt           # both stdout and stderr
command 2>&1 | other         # merge stderr into stdout, then pipe
command > /dev/null 2>&1     # discard ALL output`})]}),i==="conditionals"&&e.jsxs(e.Fragment,{children:[e.jsx("h2",{className:"section-title",children:"Conditionals"}),e.jsx(n,{language:"bash",filename:"scripts/conditionals.sh",code:`#!/bin/bash

# ── IF / ELIF / ELSE ──────────────────────────────────────────
age=25

if [ "$age" -ge 18 ]; then
    echo "Adult"
elif [ "$age" -ge 13 ]; then
    echo "Teenager"
else
    echo "Child"
fi

# ── TEST CONDITIONS ([ ] vs [[ ]]) ────────────────────────────
# [ ] is POSIX test — portable but limited
# [[ ]] is bash extension — more features, safer

# String comparisons
[ "$str" = "hello" ]         # equal
[ "$str" != "hello" ]        # not equal
[ -z "$str" ]                # empty string (zero length)
[ -n "$str" ]                # non-empty string

# Numeric comparisons (use -eq not == for numbers)
[ "$num" -eq 0 ]             # equal
[ "$num" -ne 0 ]             # not equal
[ "$num" -lt 10 ]            # less than
[ "$num" -le 10 ]            # less than or equal
[ "$num" -gt 10 ]            # greater than
[ "$num" -ge 10 ]            # greater than or equal

# File tests
[ -e "/etc/hosts" ]          # exists (any type)
[ -f "/etc/hosts" ]          # exists and is regular file
[ -d "/etc/hosts" ]          # exists and is directory
[ -L "/etc/hosts" ]          # exists and is symlink
[ -r "/etc/hosts" ]          # readable
[ -w "/etc/hosts" ]          # writable
[ -x "/usr/bin/bash" ]       # executable
[ -s "/var/log/syslog" ]     # exists and not empty

# Bash extended [[ ]] features
[[ "$str" == *"hello"* ]]    # glob pattern match
[[ "$str" =~ ^[0-9]+$ ]]    # regex match
[[ -f "/etc/hosts" && -r "/etc/hosts" ]]  # AND without quoting issues
[[ "$a" < "$b" ]]            # lexicographic comparison (safe in [[]])

# ── PRACTICAL EXAMPLES ────────────────────────────────────────
# Check if running as root
if [ "$(id -u)" -ne 0 ]; then
    echo "ERROR: Must be run as root" >&2
    exit 1
fi

# Check if a command exists
if ! command -v ansible &>/dev/null; then
    echo "Ansible is not installed"
    exit 1
fi

# Check if a service is running
if systemctl is-active --quiet httpd; then
    echo "httpd is running"
else
    echo "httpd is NOT running"
fi

# ── CASE STATEMENT ────────────────────────────────────────────
OS=$(cat /etc/os-release | grep '^NAME' | cut -d= -f2 | tr -d '"')

case "$OS" in
    "Red Hat Enterprise Linux"*)
        PKG_MGR="dnf"
        ;;
    "Ubuntu"*|"Debian"*)
        PKG_MGR="apt"
        ;;
    "SLES"*|"openSUSE"*)
        PKG_MGR="zypper"
        ;;
    *)
        echo "Unknown OS: $OS" >&2
        exit 1
        ;;
esac

echo "Using package manager: $PKG_MGR"

# ── LOGICAL OPERATORS ─────────────────────────────────────────
# && — run second command only if first succeeds
# ||  — run second command only if first fails
# !   — negate

[ -f /etc/motd ] && echo "motd exists"
[ -f /etc/motd ] || echo "motd does not exist"
! [ -d /tmp/mydir ] && mkdir /tmp/mydir   # create if not exists

# Short-circuit evaluation (very common in shell scripts)
grep -q "root" /etc/passwd || { echo "root not found"; exit 1; }`})]}),i==="loops"&&e.jsxs(e.Fragment,{children:[e.jsx("h2",{className:"section-title",children:"Loops"}),e.jsx(n,{language:"bash",filename:"scripts/loops.sh",code:`#!/bin/bash

# ── FOR LOOP OVER LIST ────────────────────────────────────────
for package in httpd nginx php python3; do
    echo "Processing: $package"
    # dnf install -y "$package"
done

# ── FOR LOOP OVER ARRAY ───────────────────────────────────────
servers=("web01" "web02" "web03" "db01")
for server in "${t}{servers[@]}"; do
    echo "Connecting to: $server"
    # ssh -n "$server" 'systemctl status httpd'
done

# ── FOR LOOP WITH RANGE ───────────────────────────────────────
# C-style for loop
for ((i=1; i<=5; i++)); do
    echo "Iteration $i"
done

# Brace expansion (simpler for sequential numbers)
for i in {1..10}; do
    echo "User $i"
done

# With step
for i in {0..20..5}; do   # 0, 5, 10, 15, 20
    echo "$i"
done

# ── FOR LOOP OVER FILE CONTENTS ───────────────────────────────
# Loop over lines in a file
while IFS= read -r line; do
    echo "Processing: $line"
done < /etc/hosts

# Or with process substitution
while IFS= read -r line; do
    echo "$line"
done < <(grep -v '^#' /etc/passwd)

# ── FOR LOOP OVER COMMAND OUTPUT ──────────────────────────────
for user in $(awk -F: '$3 >= 1000 {print $1}' /etc/passwd); do
    echo "Regular user: $user"
done

# ── FOR LOOP OVER FILES ───────────────────────────────────────
for conf in /etc/*.conf; do
    echo "Config file: $conf"
done

for logfile in /var/log/httpd/*.log; do
    [ -f "$logfile" ] || continue   # skip if no match (glob safety)
    echo "Log: $logfile ($(wc -l < "$logfile") lines)"
done

# ── WHILE LOOP ────────────────────────────────────────────────
counter=0
while [ "$counter" -lt 5 ]; do
    echo "Counter: $counter"
    ((counter++))
done

# ── WHILE LOOP — WAIT FOR SERVICE ────────────────────────────
max_attempts=30
attempt=0
while ! systemctl is-active --quiet myapp && [ $attempt -lt $max_attempts ]; do
    echo "Waiting for myapp to start... (attempt $attempt)"
    sleep 2
    ((attempt++))
done

if [ $attempt -eq $max_attempts ]; then
    echo "ERROR: myapp did not start within timeout" >&2
    exit 1
fi

# ── UNTIL LOOP ────────────────────────────────────────────────
# Like while but runs until condition is TRUE (opposite of while)
until systemctl is-active --quiet myapp; do
    echo "Waiting..."
    sleep 5
done
echo "myapp is now running!"

# ── LOOP CONTROL ──────────────────────────────────────────────
for i in {1..10}; do
    [ "$i" -eq 5 ] && continue   # skip 5
    [ "$i" -eq 8 ] && break      # stop at 8
    echo "$i"
done

# ── INFINITE LOOP WITH EXIT ───────────────────────────────────
while true; do
    if systemctl is-active --quiet myapp; then
        echo "Service is up!"
        break
    fi
    sleep 1
done`})]}),i==="functions"&&e.jsxs(e.Fragment,{children:[e.jsx("h2",{className:"section-title",children:"Functions, Input & Output"}),e.jsx(n,{language:"bash",filename:"scripts/functions.sh",code:`#!/bin/bash

# ── DEFINING FUNCTIONS ────────────────────────────────────────
# Functions must be defined before they're called

log_info() {
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    echo "[$timestamp] [INFO]  $*"
}

log_error() {
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    echo "[$timestamp] [ERROR] $*" >&2   # errors go to stderr
}

# ── FUNCTION ARGUMENTS ────────────────────────────────────────
greet() {
    local name="$1"           # 'local' limits scope to function
    local greeting="${t}{2:-Hello}"  # default value
    echo "$greeting, $name!"
}

greet "Alice"            # Hello, Alice!
greet "Bob" "Howdy"      # Howdy, Bob!

# ── RETURN VALUES ─────────────────────────────────────────────
# Bash functions return EXIT CODES (0-255), not values
# To "return" a string, echo it and capture with $()

is_installed() {
    command -v "$1" &>/dev/null
    # returns 0 if found, 1 if not found
}

get_os_family() {
    if grep -qi "red hat|centos|fedora|rhel" /etc/os-release 2>/dev/null; then
        echo "RedHat"
    elif grep -qi "debian|ubuntu" /etc/os-release 2>/dev/null; then
        echo "Debian"
    else
        echo "Unknown"
    fi
}

# Calling and capturing output
if is_installed ansible; then
    log_info "Ansible is installed: $(ansible --version | head -1)"
else
    log_error "Ansible not found"
    exit 1
fi

os_family=$(get_os_family)
log_info "OS family: $os_family"

# ── EXIT CODES ────────────────────────────────────────────────
# 0   = success (convention)
# 1   = general error
# 2   = misuse of shell command
# 126 = command found but not executable
# 127 = command not found
# 128+n = fatal error signal n (e.g., 130 = SIGINT/Ctrl+C)

check_root() {
    if [ "$(id -u)" -ne 0 ]; then
        log_error "This script must be run as root"
        return 1   # return (not exit) from function
    fi
    return 0
}

check_root || exit 1   # exit the script if not root

# ── TRAPS — run cleanup on exit/error ─────────────────────────
TEMP_FILE=$(mktemp /tmp/myscript.XXXXXX)   # safe temp file

cleanup() {
    log_info "Cleaning up temporary files..."
    rm -f "$TEMP_FILE"
}

trap cleanup EXIT       # run cleanup() on any exit (normal or error)
trap 'log_error "Script failed at line $LINENO"; cleanup; exit 1' ERR

# ── READING INPUT ─────────────────────────────────────────────
read -p "Enter your name: " username
read -s -p "Enter password: " password   # -s hides input
echo ""   # newline after hidden input

# Read with timeout
if read -t 10 -p "Continue? [y/N] " answer; then
    [[ "$answer" =~ ^[Yy]$ ]] || { echo "Aborted"; exit 1; }
else
    echo ""
    echo "Timeout — aborting"
    exit 1
fi

# ── PARSING ARGUMENTS ─────────────────────────────────────────
usage() {
    cat <<EOF
Usage: $0 [OPTIONS] <hostname>

Options:
  -u, --user     Remote username (default: ansible)
  -p, --port     SSH port (default: 22)
  -v, --verbose  Verbose output
  -h, --help     Show this help

Example: $0 -u deploy -p 2222 web01.example.com
EOF
}

# Simple positional parsing
HOST=""
REMOTE_USER="ansible"
PORT=22
VERBOSE=false

while [[ $# -gt 0 ]]; do
    case "$1" in
        -u|--user)
            REMOTE_USER="$2"
            shift 2
            ;;
        -p|--port)
            PORT="$2"
            shift 2
            ;;
        -v|--verbose)
            VERBOSE=true
            shift
            ;;
        -h|--help)
            usage
            exit 0
            ;;
        -*)
            echo "Unknown option: $1" >&2
            usage >&2
            exit 1
            ;;
        *)
            HOST="$1"
            shift
            ;;
    esac
done

[ -z "$HOST" ] && { echo "ERROR: hostname required" >&2; usage >&2; exit 1; }

# ── HEREDOC ───────────────────────────────────────────────────
# Write multi-line content without echo quotes
cat > /tmp/config.ini << 'EOF'
[global]
user = ansible
port = 22
key_file = ~/.ssh/id_rsa
EOF

# Heredoc with variable expansion (no quotes around EOF)
cat > /tmp/hosts.txt << EOF
127.0.0.1   localhost
$HOST   managed-node
EOF`})]}),i==="analyzing"&&e.jsxs(e.Fragment,{children:[e.jsx("h2",{className:"section-title",children:"Analyzing Scripts for the Exam"}),e.jsxs("p",{children:["The RHCE exam asks you to ",e.jsx("strong",{children:"analyze simple shell scripts"})," — understand what they do without running them. This section covers the key patterns to recognize."]}),e.jsxs(r,{type:"exam",children:["When analyzing a script, follow this checklist:",e.jsxs("ol",{style:{margin:"0.5rem 0 0",paddingLeft:"1.2rem"},children:[e.jsxs("li",{children:["What does the shebang say? (",e.jsx("code",{children:"bash"}),", ",e.jsx("code",{children:"sh"}),", ",e.jsx("code",{children:"python"}),"?)"]}),e.jsxs("li",{children:["What arguments does it accept? (",e.jsx("code",{children:"$1"}),", ",e.jsx("code",{children:"$@"}),")"]}),e.jsx("li",{children:"What does it do if arguments are wrong? (exit code?)"}),e.jsx("li",{children:"What commands does it run? (any side effects?)"}),e.jsx("li",{children:"What does it output to stdout vs stderr?"}),e.jsx("li",{children:"What exit code does it return in each case?"})]})]}),e.jsx(n,{language:"bash",filename:"ANALYZE THIS: scripts/deploy.sh",code:`#!/bin/bash
# What does this script do? Let's analyze it together.

set -euo pipefail   # KEY: -e = exit on error, -u = error on undefined vars,
                    #       -o pipefail = pipe fails if any command fails

readonly DEPLOY_DIR="/opt/myapp"
readonly BACKUP_DIR="/var/backups/myapp"
readonly SERVICE_NAME="myapp"

log() { echo "[$(date '+%H:%M:%S')] $*"; }
die() { echo "FATAL: $*" >&2; exit 1; }

# --- ANALYSIS POINT 1: requires exactly 1 argument ---
[ "$#" -ne 1 ] && die "Usage: $0 <version>"
VERSION="$1"

# --- ANALYSIS POINT 2: requires root ---
[ "$(id -u)" -ne 0 ] && die "Must run as root"

ARTIFACT="myapp-${t}{VERSION}.tar.gz"
ARTIFACT_URL="https://releases.example.com/${t}{ARTIFACT}"

# --- ANALYSIS POINT 3: downloads a file ---
log "Downloading version ${t}{VERSION}..."
curl -fsSL -o "/tmp/${t}{ARTIFACT}" "${t}{ARTIFACT_URL}" || die "Download failed"

# --- ANALYSIS POINT 4: creates backup ---
log "Backing up current deployment..."
mkdir -p "$BACKUP_DIR"
[ -d "$DEPLOY_DIR" ] && tar -czf "${t}{BACKUP_DIR}/backup-$(date +%s).tar.gz" "$DEPLOY_DIR"

# --- ANALYSIS POINT 5: stops service, deploys, starts service ---
log "Stopping ${t}{SERVICE_NAME}..."
systemctl stop "$SERVICE_NAME" || true   # 'true' means ignore failure

log "Deploying version ${t}{VERSION}..."
rm -rf "$DEPLOY_DIR"
mkdir -p "$DEPLOY_DIR"
tar -xzf "/tmp/${t}{ARTIFACT}" -C "$DEPLOY_DIR" --strip-components=1

log "Starting ${t}{SERVICE_NAME}..."
systemctl start "$SERVICE_NAME"

# --- ANALYSIS POINT 6: verifies deployment ---
sleep 2
if ! systemctl is-active --quiet "$SERVICE_NAME"; then
    die "Service failed to start after deployment"
fi

log "Deployment of version ${t}{VERSION} complete!"
exit 0   # explicit 0 = success`}),e.jsxs("div",{style:{background:"var(--bg-card)",border:"1px solid #34d399",borderRadius:"var(--radius-lg)",padding:"1.5rem",margin:"1rem 0"},children:[e.jsx("h3",{style:{color:"#34d399",marginBottom:"1rem",fontSize:"0.9rem"},children:"Script Analysis Summary"}),e.jsx("div",{style:{display:"grid",gap:"8px"},children:[["Input",'One argument: version string (e.g. "2.5.0")'],["Requires root","Yes — exits with fatal error if not root"],["Side effects","Downloads a file, backs up /opt/myapp, deploys new version, restarts service"],["Success exit code","0 (explicit exit 0 at the end)"],["Failure exit codes","Non-zero via die() function — any of: wrong args, not root, download fail, service fail"],["set -euo pipefail","Any unhandled error will exit immediately (important for analysis!)"]].map(([s,o])=>e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"160px 1fr",gap:"12px"},children:[e.jsx("span",{style:{color:"#34d399",fontWeight:600,fontSize:"0.85rem"},children:s}),e.jsx("span",{style:{color:"var(--text-secondary)",fontSize:"0.85rem"},children:o})]},s))})]}),e.jsx("h3",{style:{color:"var(--text-primary)",marginTop:"1.5rem"},children:"Common Pattern Recognition"}),e.jsx(n,{language:"bash",title:"Patterns to recognize instantly",code:`# ── set -e, set -u, set -o pipefail ──────────────────────────
# These change error behavior — VERY important for analysis
set -e              # exit immediately if any command fails
set -u              # treat undefined variables as errors
set -o pipefail     # pipeline fails if any command in it fails
set -x              # print each command before executing (debug mode)
set -euo pipefail   # all three common options combined

# ── ${t}{variable:-default} ──────────────────────────────────────
DIR="${t}{1:-/tmp}"    # if $1 is empty, use /tmp

# ── [[ ... ]] vs [ ... ] ─────────────────────────────────────
# [[ ]] is safer — no word splitting, better string handling
# [ ] is POSIX — works in /bin/sh scripts too

# ── $(...) command substitution ───────────────────────────────
VERSION=$(cat /etc/myapp/VERSION)   # capture command output

# ── 2>&1 and &> ───────────────────────────────────────────────
command 2>&1    # redirect stderr to stdout
command &>file  # both stdout and stderr to file
command 2>/dev/null   # suppress stderr

# ── Pipe chain analysis ───────────────────────────────────────
# What does this produce?
grep -v '^#' /etc/passwd | awk -F: '$3>=1000{print $1}' | sort
# 1. grep: remove comment lines from /etc/passwd
# 2. awk: print username field (field 1) where UID >= 1000 (regular users)
# 3. sort: alphabetical sort
# OUTPUT: list of regular (non-system) usernames, sorted

# ── Error handling with || ─────────────────────────────────────
mkdir /tmp/dir || exit 1          # exit if mkdir fails
command || { echo "failed" >&2; exit 1; }   # more complex error handler

# ── Subshell ( ) vs block { } ─────────────────────────────────
( cd /tmp && rm -f *.log )        # subshell: cwd change doesn't affect parent
{ cd /tmp && rm -f *.log; }       # block: runs in current shell (cwd DOES change)

# ── Redirect within heredoc ───────────────────────────────────
cat << 'MARKER' > /etc/myapp/config   # heredoc to a file
[settings]
key = value
MARKER`})]}),i==="ansible-shell"&&e.jsxs(e.Fragment,{children:[e.jsx("h2",{className:"section-title",children:"Running Scripts with Ansible"}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px",margin:"1rem 0"},children:[{title:"ansible.builtin.command",color:"#34d399",when:"Simple commands, no shell features needed",points:["No pipes, redirects, or shell variables","Safer — no shell injection risk","Returns rc, stdout, stderr","won't trigger changed_when by itself"]},{title:"ansible.builtin.shell",color:"#818cf8",when:"Need pipes, redirects, globs, shell variables",points:["Full shell (bash by default)","Supports |, >, >>, &&, ||, $(...)","Can set executable: /bin/sh","slightly less safe — sanitize inputs!"]},{title:"ansible.builtin.script",color:"#fbbf24",when:"Run a local script on remote hosts",points:["Copies script to remote, executes, removes","No need for Python on remote host","Can pass arguments","Script runs in shell on remote host"]},{title:"ansible.builtin.raw",color:"#fb7185",when:"Host has no Python (bootstrapping)",points:["Raw SSH command — no modules","No idempotency checking","Last resort for new/minimal hosts","Returns rc, stdout, stderr"]}].map(s=>e.jsxs("div",{style:{background:"var(--bg-card)",border:`1px solid ${s.color}44`,borderRadius:"var(--radius-lg)",padding:"1.25rem"},children:[e.jsx("code",{style:{color:s.color,fontSize:"0.82rem",display:"block",marginBottom:"6px"},children:s.title}),e.jsxs("div",{style:{color:"var(--text-muted)",fontSize:"0.75rem",marginBottom:"10px",fontStyle:"italic"},children:["Use when: ",s.when]}),e.jsx("ul",{style:{margin:0,paddingLeft:"1.2rem",color:"var(--text-secondary)",fontSize:"0.82rem"},children:s.points.map((o,c)=>e.jsx("li",{style:{marginBottom:"4px"},children:o},c))})]},s.title))}),e.jsx(n,{language:"yaml",filename:"playbooks/shell-examples.yml",code:`---
- name: Running shell commands and scripts with Ansible
  hosts: all
  become: true

  tasks:

    # ── COMMAND (no shell features) ───────────────────────────
    - name: Check disk usage
      ansible.builtin.command:
        cmd: df -h /
      register: disk_usage
      changed_when: false   # reading never changes state

    - name: Run a command only if a file doesn't exist
      ansible.builtin.command:
        cmd: /usr/bin/myapp --initialize
        creates: /var/lib/myapp/.initialized   # idempotency guard

    - name: Run a command only if a file DOES exist
      ansible.builtin.command:
        cmd: /usr/bin/myapp --migrate
        removes: /var/lib/myapp/pending-migrations   # skip if file gone

    # ── SHELL (pipes, redirects, shell variables) ─────────────
    - name: Count ERROR lines in log
      ansible.builtin.shell:
        cmd: grep -c 'ERROR' /var/log/myapp.log || echo 0
      register: error_count
      changed_when: false

    - name: Complex pipeline
      ansible.builtin.shell: |
        ps aux | grep -v grep | grep myapp | awk '{print $2}' | head -1
      register: app_pid
      changed_when: false

    - name: Shell with specific shell
      ansible.builtin.shell:
        cmd: source /etc/profile && myapp --status
        executable: /bin/bash   # ensure bash (not /bin/sh) is used

    # ── SCRIPT (local script → run on remote) ─────────────────
    - name: Run local setup script on remote host
      ansible.builtin.script:
        cmd: scripts/setup.sh --env production --version "{{ app_version }}"
        creates: /var/lib/myapp/.setup-complete

    - name: Script with custom interpreter
      ansible.builtin.script:
        cmd: scripts/check.py --strict
        executable: /usr/bin/python3

    # ── RAW (no Python needed on remote) ─────────────────────
    - name: Bootstrap Python on a minimal host
      ansible.builtin.raw: dnf install -y python3
      changed_when: false

    # ── REGISTER AND USE RESULTS ──────────────────────────────
    - name: Get kernel version
      ansible.builtin.command: uname -r
      register: kernel_ver
      changed_when: false

    - name: Conditional based on command output
      ansible.builtin.debug:
        msg: "Running kernel: {{ kernel_ver.stdout }}"

    - name: Fail if old kernel
      ansible.builtin.fail:
        msg: "Kernel too old: {{ kernel_ver.stdout }}"
      when: kernel_ver.stdout is version('5.0', '<')

    # ── STDOUT/STDERR/RC in register ─────────────────────────
    # After register, result contains:
    # result.rc       — exit code (0 = success)
    # result.stdout   — standard output (string)
    # result.stderr   — standard error (string)
    # result.stdout_lines — stdout as list of lines
    # result.stderr_lines — stderr as list of lines
    # result.failed   — True if task failed
    # result.changed  — True if task reported change

    - name: Run a command that might fail
      ansible.builtin.command: systemctl is-active myapp
      register: svc_status
      failed_when: false     # don't fail the play on non-zero rc
      changed_when: false

    - name: Restart if not active
      ansible.builtin.service:
        name: myapp
        state: restarted
      when: svc_status.rc != 0`}),e.jsxs(r,{type:"tip",children:[e.jsx("strong",{children:"Idempotency with command/shell:"})," Always use ",e.jsx("code",{children:"creates:"})," or",e.jsx("code",{children:" removes:"})," with the ",e.jsx("code",{children:"command"})," module, or",e.jsx("code",{children:" changed_when:"}),' with specific conditions. This prevents Ansible from reporting spurious "changed" status every time it runs.']})]})]})}export{f as default};
