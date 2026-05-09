import{r as d,j as e}from"./index-V6pXZagA.js";import{P as p,C as s}from"./CodeBlock-ClK0BBrp.js";import{I as l}from"./InfoBox-D5QG7ZYC.js";function f(){const[t,r]=d.useState("vault-commands"),o=[{key:"vault-commands",label:"Vault Commands"},{key:"vault-usage",label:"Vault in Playbooks"},{key:"jinja2-basics",label:"Jinja2 Basics"},{key:"jinja2-filters",label:"Filters"},{key:"jinja2-control",label:"Control Structures"},{key:"template-examples",label:"Full Templates"}];return e.jsxs("div",{className:"page-container fade-in",children:[e.jsx(p,{title:"Vault & Templates",icon:"🔒",description:"Protect sensitive data with Ansible Vault encryption, and generate dynamic configuration files using Jinja2 templates with variables, filters, and control structures.",tags:["ansible-vault","Jinja2","encrypt_string","Templates","filters","j2"]}),e.jsx("div",{style:{display:"flex",gap:"6px",marginBottom:"1.5rem",flexWrap:"wrap"},children:o.map(a=>e.jsx("button",{onClick:()=>r(a.key),style:{padding:"7px 16px",borderRadius:"var(--radius-md)",border:`1px solid ${t===a.key?"var(--accent-primary)":"var(--border-subtle)"}`,background:t===a.key?"var(--accent-primary-subtle)":"var(--bg-card)",color:t===a.key?"var(--accent-primary)":"var(--text-muted)",fontSize:"0.8rem",fontWeight:600,cursor:"pointer",transition:"all 150ms"},children:a.label},a.key))}),t==="vault-commands"&&e.jsxs(e.Fragment,{children:[e.jsx("h2",{className:"section-title",children:"Ansible Vault Commands"}),e.jsx("p",{children:"Ansible Vault encrypts sensitive data (passwords, API keys, certificates) using AES-256 encryption. Encrypted content is stored as regular YAML files that can be safely committed to version control."}),e.jsxs("div",{style:{background:"var(--bg-card)",border:"1px solid #fb7185",borderRadius:"var(--radius-lg)",padding:"1.5rem",margin:"1rem 0"},children:[e.jsx("h3",{style:{color:"#fb7185",marginBottom:"1rem",fontSize:"0.9rem"},children:"Vault Workflow"}),[{step:1,label:"Create vault password",cmd:'echo "MyVaultPass" > .vault_pass && chmod 600 .vault_pass'},{step:2,label:"Encrypt sensitive files",cmd:"ansible-vault encrypt vars/secrets.yml"},{step:3,label:"Reference in playbook",cmd:"vars_files: [vars/secrets.yml]"},{step:4,label:"Run with vault pass",cmd:"ansible-navigator run site.yml --vault-password-file .vault_pass"}].map(({step:a,label:i,cmd:n})=>e.jsxs("div",{style:{display:"flex",gap:"12px",alignItems:"flex-start",marginBottom:"12px"},children:[e.jsx("span",{style:{width:"24px",height:"24px",borderRadius:"50%",background:"#fb718520",border:"1px solid #fb7185",display:"flex",alignItems:"center",justifyContent:"center",color:"#fb7185",fontSize:"0.75rem",fontWeight:700,flexShrink:0},children:a}),e.jsxs("div",{children:[e.jsx("div",{style:{color:"var(--text-secondary)",fontSize:"0.85rem",marginBottom:"4px"},children:i}),e.jsx("code",{style:{color:"#a5f3fc",fontFamily:"var(--font-mono)",fontSize:"0.8rem",background:"#0d1117",padding:"4px 10px",borderRadius:"4px",display:"block"},children:n})]})]},a))]}),e.jsx(s,{language:"bash",title:"All ansible-vault commands",code:`# ── CREATE A NEW ENCRYPTED FILE ───────────────────────────────
# Opens your $EDITOR (usually vim), then encrypts on save
ansible-vault create vars/secrets.yml
ansible-vault create --vault-id prod@prompt vars/prod-secrets.yml  # named vault

# ── ENCRYPT AN EXISTING FILE ───────────────────────────────────
ansible-vault encrypt vars/secrets.yml
ansible-vault encrypt vars/secrets.yml --vault-password-file .vault_pass

# ── DECRYPT A FILE (in-place) ─────────────────────────────────
ansible-vault decrypt vars/secrets.yml
# Note: decrypted file will contain plaintext! Don't commit this.

# ── VIEW ENCRYPTED FILE (don't decrypt permanently) ───────────
ansible-vault view vars/secrets.yml

# ── EDIT AN ENCRYPTED FILE ────────────────────────────────────
ansible-vault edit vars/secrets.yml   # opens in $EDITOR, re-encrypts on save

# ── ENCRYPT A SINGLE STRING VALUE ─────────────────────────────
# Perfect for individual variables — paste output into your vars files
ansible-vault encrypt_string 'MySecretPassword' --name 'db_password'
# Output:
# db_password: !vault |
#   $ANSIBLE_VAULT;1.1;AES256
#   38613431613935323...

# From stdin (avoids password in shell history)
ansible-vault encrypt_string --stdin-name 'api_key'

# ── REKEY — change the vault password ─────────────────────────
ansible-vault rekey vars/secrets.yml
ansible-vault rekey vars/secrets.yml --new-vault-password-file .new_vault_pass

# ── ENCRYPT MULTIPLE FILES ────────────────────────────────────
ansible-vault encrypt vars/*.yml
find . -name "vault.yml" -exec ansible-vault encrypt {} \\;

# ── VIEW VAULT-ENCRYPTED VARIABLE ────────────────────────────
ansible-vault decrypt --output=- vars/secrets.yml   # print to stdout`}),e.jsx(s,{language:"bash",title:"Providing vault passwords when running playbooks",code:`# ── INTERACTIVE PROMPT ────────────────────────────────────────
ansible-navigator run site.yml --ask-vault-pass
ansible-playbook site.yml --ask-vault-pass

# ── PASSWORD FILE ─────────────────────────────────────────────
# Create a file with just the password (no newline issues usually fine)
echo "MyVaultPassword" > .vault_pass
chmod 600 .vault_pass        # restrict permissions!
echo ".vault_pass" >> .gitignore    # NEVER commit this!

ansible-navigator run site.yml --vault-password-file .vault_pass

# ── VAULT PASSWORD SCRIPT ─────────────────────────────────────
# Can be an executable that outputs the password
# Great for fetching from a secrets manager (HashiCorp Vault, AWS SSM, etc.)
cat > get_vault_pass.sh << 'EOF'
#!/bin/bash
aws ssm get-parameter --name /myapp/vault_password --query Parameter.Value --output text
EOF
chmod +x get_vault_pass.sh

ansible-navigator run site.yml --vault-password-file ./get_vault_pass.sh

# ── IN ansible.cfg ────────────────────────────────────────────
# [defaults]
# vault_password_file = .vault_pass   # auto-detected, no flag needed

# ── VAULT IDs (for multiple vault passwords) ──────────────────
# Useful when different secrets have different passwords
ansible-vault create --vault-id dev@prompt vars/dev-secrets.yml
ansible-vault create --vault-id prod@.prod_vault_pass vars/prod-secrets.yml

ansible-navigator run site.yml \\
  --vault-id dev@.dev_vault_pass \\
  --vault-id prod@.prod_vault_pass`})]}),t==="vault-usage"&&e.jsxs(e.Fragment,{children:[e.jsx("h2",{className:"section-title",children:"Using Vault in Playbooks"}),e.jsxs(l,{type:"key",children:["Best practice: keep a ",e.jsx("strong",{children:"vars.yml"})," (unencrypted, safe to commit) and a",e.jsx("strong",{children:" vault.yml"})," (encrypted, secrets only). Reference both in",e.jsx("code",{children:" vars_files"}),". The vars file can reference vault variables:",e.jsxs("code",{children:[' db_password: "',"{{ vault_db_password }}",'"']}),"."]}),e.jsx(s,{language:"yaml",filename:"vars/vars.yml",code:`---
# vars.yml — safe to commit to version control
db_host: db01.example.com
db_port: 5432
db_name: myapp_production
db_user: myapp

# Reference the vault variable with a regular variable name
# This allows the plaintext name to appear in logs, while the actual
# secret stays encrypted in vault.yml
db_password: "{{ vault_db_password }}"
api_key: "{{ vault_api_key }}"
ssl_cert_content: "{{ vault_ssl_cert }}"`}),e.jsx(s,{language:"yaml",filename:"vars/vault.yml",code:`---
# vault.yml — ENCRYPTED with ansible-vault
# This file should ONLY contain raw secret values
# All variable names prefixed with 'vault_' by convention

vault_db_password: "MyD@tabaseP@ss!"
vault_api_key: "sk-abcdef1234567890abcdef"
vault_ssl_cert: |
  -----BEGIN CERTIFICATE-----
  MIIDXTCCAkWgAwIBAgIJANS3X...
  -----END CERTIFICATE-----`}),e.jsx(s,{language:"yaml",filename:"site.yml",code:`---
- name: Deploy application
  hosts: appservers
  become: true

  # ── LOAD BOTH FILES ────────────────────────────────────────
  vars_files:
    - vars/vars.yml
    - vars/vault.yml     # encrypted — vault password needed at runtime

  tasks:
    - name: Configure database connection
      ansible.builtin.template:
        src: templates/database.conf.j2
        dest: /etc/myapp/database.conf
        mode: '0640'
        owner: myapp
        group: myapp
      # Template can use {{ db_host }}, {{ db_password }}, etc.

    - name: Deploy SSL certificate
      ansible.builtin.copy:
        content: "{{ ssl_cert_content }}"
        dest: /etc/pki/tls/certs/myapp.crt
        mode: '0644'

# ── ENCRYPT_STRING INLINE USAGE ───────────────────────────────
# Instead of a vault file, embed encrypted values directly in playbooks:
- name: Using encrypt_string
  hosts: all
  vars:
    db_password: !vault |
      $ANSIBLE_VAULT;1.1;AES256
      31613631313832396664...

  tasks:
    - ansible.builtin.debug:
        msg: "Password length: {{ db_password | length }}"

# ── VAULT WITH ROLES ──────────────────────────────────────────
# Place vault.yml in:
# group_vars/all/vault.yml
# group_vars/webservers/vault.yml
# host_vars/web01.example.com/vault.yml
# Ansible auto-loads these — no vars_files needed`})]}),t==="jinja2-basics"&&e.jsxs(e.Fragment,{children:[e.jsx("h2",{className:"section-title",children:"Jinja2 Template Basics"}),e.jsxs("p",{children:["Jinja2 is the templating engine Ansible uses for both template files (",e.jsx("code",{children:".j2"}),") and variable expressions inside playbooks. Templates are rendered on the control node and the result is sent to the managed host."]}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"12px",margin:"1rem 0"},children:[{syntax:"{{ variable }}",name:"Expression",desc:"Output a value",color:"#818cf8"},{syntax:"{% statement %}",name:"Statement",desc:"Control flow (if, for)",color:"#34d399"},{syntax:"{# comment #}",name:"Comment",desc:"Not rendered in output",color:"#4b5563"}].map(a=>e.jsxs("div",{style:{background:"var(--bg-card)",border:`1px solid ${a.color}44`,borderRadius:"var(--radius-lg)",padding:"1rem"},children:[e.jsx("code",{style:{color:a.color,fontFamily:"var(--font-mono)",fontSize:"0.85rem",display:"block",marginBottom:"8px"},children:a.syntax}),e.jsx("div",{style:{color:"var(--text-primary)",fontWeight:600,fontSize:"0.85rem"},children:a.name}),e.jsx("div",{style:{color:"var(--text-muted)",fontSize:"0.78rem"},children:a.desc})]},a.name))}),e.jsx(s,{language:"text",filename:"templates/app.conf.j2",code:`{# app.conf.j2 — Application configuration template #}
{# Comments are stripped from output #}

# ===================================================================
# Application Configuration
# Generated by Ansible on {{ ansible_date_time.iso8601 }}
# Managed host: {{ inventory_hostname }}
# DO NOT EDIT MANUALLY
# ===================================================================

[server]
hostname    = {{ ansible_hostname }}
fqdn        = {{ ansible_fqdn }}
ip_address  = {{ ansible_default_ipv4.address }}
port        = {{ app_port | default(8080) }}
workers     = {{ app_workers | default(ansible_processor_vcpus * 2) }}

[database]
host        = {{ db_host }}
port        = {{ db_port | default(5432) }}
name        = {{ db_name }}
user        = {{ db_user }}
password    = {{ db_password }}
max_conn    = {{ db_max_connections | default(100) }}

[logging]
level       = {{ log_level | default('INFO') | upper }}
file        = {{ log_dir | default('/var/log/myapp') }}/{{ app_name }}.log
max_size_mb = {{ log_max_size | default(100) }}

[features]
debug_mode  = {{ debug_mode | default(false) | lower }}
cache_ttl   = {{ cache_ttl | default(3600) }}`}),e.jsx(s,{language:"yaml",filename:"playbooks/deploy-template.yml",code:`---
- name: Deploy configuration from template
  hosts: appservers
  become: true

  vars:
    app_name: myapp
    app_port: 8080
    db_host: db01.example.com
    db_name: myapp_prod
    db_user: myapp
    # db_password comes from vault

  tasks:
    - name: Deploy application configuration
      ansible.builtin.template:
        src: templates/app.conf.j2  # relative to playbook
        dest: /etc/myapp/app.conf
        owner: myapp
        group: myapp
        mode: '0640'
        backup: true
      notify: Restart myapp

    # Template variables can also come from:
    # - host_vars/hostname.yml
    # - group_vars/all.yml
    # - vars_files
    # - set_fact
    # - ansible_facts (all gathered facts are available!)`})]}),t==="jinja2-filters"&&e.jsxs(e.Fragment,{children:[e.jsx("h2",{className:"section-title",children:"Jinja2 Filters"}),e.jsxs("p",{children:["Filters transform values using the pipe ",e.jsx("code",{children:"|"})," operator. Ansible adds many custom filters on top of Jinja2's built-in set."]}),e.jsx("h3",{style:{color:"var(--text-primary)",marginTop:"1rem"},children:"String Filters"}),e.jsx(s,{language:"text",title:"String manipulation in templates and playbooks",code:`{# String case manipulation #}
{{ "hello world" | upper }}          → HELLO WORLD
{{ "HELLO WORLD" | lower }}          → hello world
{{ "hello world" | title }}          → Hello World
{{ "hello world" | capitalize }}     → Hello world

{# Trimming and padding #}
{{ "  hello  " | trim }}             → hello
{{ "hello" | center(11) }}           → "   hello   "
{{ "hello" | ljust(10, '-') }}       → hello-----
{{ "hello" | rjust(10, '-') }}       → -----hello

{# String manipulation #}
{{ "hello world" | replace("world", "ansible") }}  → hello ansible
{{ "hello-world" | replace("-", "_") }}            → hello_world

{# Splitting and joining #}
{{ "a,b,c" | split(",") }}           → ['a', 'b', 'c']
{{ ['a', 'b', 'c'] | join(", ") }}   → a, b, c
{{ ['a', 'b', 'c'] | join("
") }}   → a
b
c (multiline)

{# Length and contains #}
{{ "hello" | length }}               → 5
{{ ['a', 'b', 'c'] | length }}       → 3
{{ "hello" is search("ell") }}       → True

{# Regex #}
{{ "hello world" | regex_replace("(\\w+)", "[\\1]") }}  → [hello] [world]
{{ "eth0" | regex_search("^eth") }}                      → eth (or None)

{# Hashing (useful for comparing configs) #}
{{ "mypassword" | hash('sha256') }}
{{ "mypassword" | password_hash('sha512') }}   # for /etc/shadow format`}),e.jsx("h3",{style:{color:"var(--text-primary)",marginTop:"1.5rem"},children:"Number & Type Filters"}),e.jsx(s,{language:"text",title:"Type conversion and math",code:`{# Type conversion #}
{{ "42" | int }}              → 42
{{ "3.14" | float }}          → 3.14
{{ 42 | string }}             → "42"
{{ "yes" | bool }}            → True
{{ [1, 2, 3] | list }}        → [1, 2, 3]

{# Math #}
{{ 1024 * 1024 | int }}       → 1048576
{{ ansible_memtotal_mb | int // 1024 }} → RAM in GB

{# Rounding #}
{{ 3.7 | round }}             → 4.0
{{ 3.7 | round(0, 'ceil') }}  → 4.0
{{ 3.2 | round(0, 'floor') }} → 3.0

{# Min/Max #}
{{ [1, 5, 3] | min }}         → 1
{{ [1, 5, 3] | max }}         → 5`}),e.jsx("h3",{style:{color:"var(--text-primary)",marginTop:"1.5rem"},children:"List & Dict Filters"}),e.jsx(s,{language:"text",title:"List and dictionary manipulation",code:`{# List operations #}
{{ [3, 1, 2] | sort }}                    → [1, 2, 3]
{{ [3, 1, 2] | sort(reverse=true) }}      → [3, 2, 1]
{{ [1, 2, 2, 3] | unique }}               → [1, 2, 3]
{{ [1, 2] + [3, 4] }}                     → [1, 2, 3, 4]  (concatenate)
{{ [1, 2, 3] | reverse | list }}          → [3, 2, 1]
{{ [1, 2, 3] | first }}                   → 1
{{ [1, 2, 3] | last }}                    → 3

{# Filter a list of dicts #}
{{ users | selectattr('active', 'true') | list }}
{{ users | selectattr('role', 'eq', 'admin') | list }}
{{ packages | rejectattr('state', 'eq', 'absent') | list }}

{# Map over a list #}
{{ users | map(attribute='name') | list }}   → ['alice', 'bob', 'charlie']
{{ items | map('upper') | list }}            → ['A', 'B', 'C']

{# Dict operations #}
{{ {'a': 1} | combine({'b': 2}) }}          → {'a': 1, 'b': 2}
{{ mydict | dict2items }}                    → [{key: ..., value: ...}]
{{ mylist | items2dict(key_name='name', value_name='value') }}

{# Groupby #}
{# Group a list of hosts by OS family #}
{% for os, hosts_in_group in ansible_play_hosts | groupby('ansible_os_family') %}

{# Zip lists #}
{{ [1, 2, 3] | zip(['a', 'b', 'c']) | list }}  → [[1,'a'], [2,'b'], [3,'c']]

{# Flatten nested lists #}
{{ [[1, 2], [3, [4, 5]]] | flatten }}       → [1, 2, 3, 4, 5]
{{ [[1, 2], [3, [4, 5]]] | flatten(levels=1) }} → [1, 2, 3, [4, 5]]`}),e.jsx("h3",{style:{color:"var(--text-primary)",marginTop:"1.5rem"},children:"Default & Conditional Filters"}),e.jsx(s,{language:"text",title:"Safety and default values",code:`{# Default value when variable is undefined or empty #}
{{ undefined_var | default('fallback value') }}
{{ "" | default('fallback', boolean=true) }}  → 'fallback' (empty string = falsy)
{{ 0 | default(1, boolean=true) }}            → 1  (zero = falsy)

{# Conditional expression (ternary) #}
{{ "production" if env == "prod" else "development" }}

{# Omit optional parameter #}
- user:
    name: alice
    # If 'uid' is undefined, omit the parameter entirely (don't pass it)
    uid: "{{ uid | default(omit) }}"

{# Mandatory variable (fail if undefined) #}
{{ required_var | mandatory }}
{{ required_var | mandatory("required_var must be defined!") }}`})]}),t==="jinja2-control"&&e.jsxs(e.Fragment,{children:[e.jsx("h2",{className:"section-title",children:"Control Structures in Templates"}),e.jsx(s,{language:"text",filename:"templates/control-demo.j2",code:`{# ── IF / ELIF / ELSE ─────────────────────────────────────── #}
{% if env == "production" %}
log_level = ERROR
debug = false
replicas = 3
{% elif env == "staging" %}
log_level = WARNING
debug = false
replicas = 2
{% else %}
log_level = DEBUG
debug = true
replicas = 1
{% endif %}

{# ── IF WITH DEFINED CHECK ────────────────────────────────── #}
{% if custom_port is defined %}
port = {{ custom_port }}
{% else %}
port = 8080
{% endif %}

{# ── FOR LOOP ─────────────────────────────────────────────── #}
[allowed_hosts]
{% for host in allowed_hosts %}
host = {{ host }}
{% endfor %}

{# ── FOR LOOP WITH INDEX ───────────────────────────────────── #}
[backends]
{% for server in backend_servers %}
server{{ loop.index }} = {{ server.ip }}:{{ server.port | default(8080) }}
{% endfor %}
# loop.index    → 1-based index
# loop.index0   → 0-based index
# loop.first    → True on first iteration
# loop.last     → True on last iteration
# loop.length   → total number of items
# loop.revindex → reverse index (from end)

{# ── FOR WITH CONDITION ─────────────────────────────────────── #}
[active_backends]
{% for server in backend_servers if server.active %}
{{ server.name }} = {{ server.ip }}
{% else %}
# No active backends configured
{% endfor %}

{# ── NESTED LOOPS ─────────────────────────────────────────── #}
[virtual_hosts]
{% for vhost in virtual_hosts %}
[vhost_{{ vhost.name }}]
server_name = {{ vhost.server_name }}
{% for alias in vhost.aliases | default([]) %}
alias = {{ alias }}
{% endfor %}

{% endfor %}

{# ── WHITESPACE CONTROL ────────────────────────────────────── #}
{# By default Jinja2 keeps whitespace/newlines around blocks #}
{# Use - to strip whitespace: {%- if ... -%} #}

Hosts:
{%- for host in groups['webservers'] %}
  - {{ host }}
{%- endfor %}
{# Output: "Hosts:
  - web01
  - web02" (no extra blank lines) #}`}),e.jsx(s,{language:"text",filename:"templates/nginx-upstream.j2",code:`{# Nginx upstream block with dynamic backend list #}
upstream {{ app_name }}_backend {
    least_conn;
{% for server in groups['appservers'] %}
    server {{ hostvars[server]['ansible_default_ipv4']['address'] }}:{{ app_port | default(8080) }} weight={{ server_weight | default(1) }};
{% endfor %}
    keepalive 32;
}

server {
    listen {{ nginx_port | default(80) }};
{% if nginx_ssl | default(false) %}
    listen {{ nginx_ssl_port | default(443) }} ssl http2;
    ssl_certificate     {{ ssl_cert_path }};
    ssl_certificate_key {{ ssl_key_path }};
{% endif %}

    server_name {{ nginx_server_name | default(inventory_hostname) }}
{%- if nginx_server_aliases is defined %}
{%- for alias in nginx_server_aliases %} {{ alias }}{% endfor %}
{%- endif %};

    location / {
        proxy_pass http://{{ app_name }}_backend;
        proxy_set_header Host              $host;
        proxy_set_header X-Real-IP         $remote_addr;
        proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        proxy_connect_timeout {{ proxy_timeout | default(60) }}s;
        proxy_send_timeout    {{ proxy_timeout | default(60) }}s;
        proxy_read_timeout    {{ proxy_timeout | default(60) }}s;
    }

    access_log /var/log/nginx/{{ app_name }}-access.log combined;
    error_log  /var/log/nginx/{{ app_name }}-error.log {{ log_level | default('warn') }};
}`})]}),t==="template-examples"&&e.jsxs(e.Fragment,{children:[e.jsx("h2",{className:"section-title",children:"Complete Template Examples"}),e.jsx("h3",{style:{color:"var(--text-primary)",marginTop:"1rem"},children:"Dynamic /etc/hosts"}),e.jsx(s,{language:"text",filename:"templates/hosts.j2",code:`{# Generate /etc/hosts from Ansible inventory #}
# Ansible managed hosts file
# Generated: {{ ansible_date_time.iso8601 }}
# DO NOT EDIT MANUALLY — managed by Ansible

127.0.0.1   localhost localhost.localdomain localhost4 localhost4.localdomain4
::1         localhost localhost.localdomain localhost6 localhost6.localdomain6

# ── Inventory hosts ──────────────────────────────────────────
{% for host in groups['all'] %}
{% if hostvars[host]['ansible_default_ipv4'] is defined %}
{{ hostvars[host]['ansible_default_ipv4']['address'] | ljust(16) }} {{ host }} {{ hostvars[host]['ansible_hostname'] }}
{% endif %}
{% endfor %}`}),e.jsx("h3",{style:{color:"var(--text-primary)",marginTop:"1.5rem"},children:"rsyslog Configuration"}),e.jsx(s,{language:"text",filename:"templates/rsyslog.conf.j2",code:`# /etc/rsyslog.conf — managed by Ansible
# Generated for: {{ inventory_hostname }}

# ── Global options ────────────────────────────────────────────
$WorkDirectory /var/lib/rsyslog
$ActionFileDefaultTemplate RSYSLOG_TraditionalFileFormat

{% if rsyslog_high_precision_timestamps | default(false) %}
$ActionFileDefaultTemplate RSYSLOG_FileFormat
{% endif %}

# ── Modules ───────────────────────────────────────────────────
module(load="imuxsock")    # syslog socket
module(load="imjournal")   # systemd journal
{% if rsyslog_receive_udp | default(false) %}
module(load="imudp")
input(type="imudp" port="{{ rsyslog_udp_port | default(514) }}")
{% endif %}
{% if rsyslog_receive_tcp | default(false) %}
module(load="imtcp")
input(type="imtcp" port="{{ rsyslog_tcp_port | default(514) }}")
{% endif %}

# ── Rules ─────────────────────────────────────────────────────
{% for rule in rsyslog_rules | default([]) %}
{{ rule.facility }}.{{ rule.severity }}{% if rule.action is defined %} {{ rule.action }}{% else %} /var/log/{{ rule.log_file }}{% endif %}

{% endfor %}

# Default rules
*.info;mail.none;authpriv.none;cron.none    /var/log/messages
authpriv.*                                   /var/log/secure
mail.*                                      -/var/log/maillog
cron.*                                       /var/log/cron
*.emerg                                      :omusrmsg:*

{% if rsyslog_remote_server is defined %}
# ── Forward to central log server ────────────────────────────
*.* @@{{ rsyslog_remote_server }}:{{ rsyslog_remote_port | default(514) }}
{% endif %}`}),e.jsx("h3",{style:{color:"var(--text-primary)",marginTop:"1.5rem"},children:"sudoers Configuration"}),e.jsx(s,{language:"text",filename:"templates/sudoers.j2",code:`# /etc/sudoers.d/ansible-managed — MANAGED BY ANSIBLE
# Generated: {{ ansible_date_time.iso8601 }}
# Validated by: visudo -cf

# ── Default settings ──────────────────────────────────────────
Defaults    !visiblepw
Defaults    always_set_home
Defaults    match_group_by_gid
Defaults    env_reset
Defaults    secure_path = /sbin:/bin:/usr/sbin:/usr/bin

# ── User privileges ───────────────────────────────────────────
root        ALL=(ALL)   ALL

{% for group in sudo_groups | default([]) %}
{% if group.nopasswd | default(false) %}
%{{ group.name }}   ALL=(ALL)   NOPASSWD: {{ group.commands | default('ALL') | join(', ') }}
{% else %}
%{{ group.name }}   ALL=(ALL)   {{ group.commands | default('ALL') | join(', ') }}
{% endif %}
{% endfor %}

{% for user in sudo_users | default([]) %}
{{ user.name | ljust(16) }} ALL=({{ user.run_as | default('ALL') }}) {% if user.nopasswd | default(false) %}NOPASSWD: {% endif %}{{ user.commands | default(['ALL']) | join(', ') }}
{% endfor %}`}),e.jsxs(l,{type:"exam",children:["When using templates on the exam:",e.jsxs("ol",{style:{margin:"0.5rem 0 0",paddingLeft:"1.2rem"},children:[e.jsxs("li",{children:["Template files live in the ",e.jsx("code",{children:"templates/"})," directory with a ",e.jsx("code",{children:".j2"})," extension"]}),e.jsxs("li",{children:["Use ",e.jsx("code",{children:"ansible.builtin.template"})," module (not ",e.jsx("code",{children:"copy"}),"!) to deploy them"]}),e.jsx("li",{children:"All variables defined in the play, vars files, and facts are available in templates"}),e.jsxs("li",{children:["Use ",e.jsx("code",{children:"validate:"})," parameter to test config files before deploying"]}),e.jsxs("li",{children:["Always set proper ",e.jsx("code",{children:"owner"}),", ",e.jsx("code",{children:"group"}),", and ",e.jsx("code",{children:"mode"})]})]})]})]})]})}export{f as default};
