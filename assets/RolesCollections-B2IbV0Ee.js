import{r as o,j as e}from"./index-V6pXZagA.js";import{P as m,C as l}from"./CodeBlock-ClK0BBrp.js";import{I as i}from"./InfoBox-D5QG7ZYC.js";function t({items:r,color:s="#818cf8"}){return e.jsx("div",{style:{fontFamily:"var(--font-mono)",fontSize:"0.83rem",lineHeight:"1.8",color:"var(--text-secondary)",background:"#0d1117",padding:"1.25rem 1.5rem",borderRadius:"var(--radius-lg)",border:"1px solid var(--border-subtle)",margin:"1rem 0",overflowX:"auto"},children:r.map((a,n)=>e.jsxs("div",{style:{whiteSpace:"pre",color:a.special?s:a.dir?"var(--accent-sky)":"var(--text-secondary)"},children:[a.prefix||"",e.jsx("span",{style:{color:a.dir?"var(--accent-sky)":a.special?s:"var(--text-secondary)"},children:a.name}),a.comment&&e.jsxs("span",{style:{color:"#4d6073",fontStyle:"italic"},children:["   ",a.comment]})]},n))})}function y(){const[r,s]=o.useState("roles"),a=[{key:"roles",label:"Roles"},{key:"galaxy",label:"Ansible Galaxy"},{key:"collections",label:"Content Collections"},{key:"requirements",label:"requirements.yml"}];return e.jsxs("div",{className:"page-container fade-in",children:[e.jsx(m,{title:"Roles & Collections",icon:"⬡",description:"Build reusable automation with roles, share and consume content from Ansible Galaxy, and leverage Content Collections for namespaced modules and plugins.",tags:["Roles","ansible-galaxy","Collections","Galaxy","Automation Hub","FQCN"]}),e.jsx("div",{style:{display:"flex",gap:"6px",marginBottom:"1.5rem",flexWrap:"wrap"},children:a.map(n=>e.jsx("button",{onClick:()=>s(n.key),style:{padding:"7px 18px",borderRadius:"var(--radius-md)",border:`1px solid ${r===n.key?"var(--accent-primary)":"var(--border-subtle)"}`,background:r===n.key?"var(--accent-primary-subtle)":"var(--bg-card)",color:r===n.key?"var(--accent-primary)":"var(--text-muted)",fontSize:"0.82rem",fontWeight:600,cursor:"pointer",transition:"all 150ms"},children:n.label},n.key))}),r==="roles"&&e.jsxs(e.Fragment,{children:[e.jsx("h2",{className:"section-title",children:"Ansible Roles"}),e.jsxs("p",{children:["A role is a ",e.jsx("strong",{children:"structured directory of tasks, variables, files, and templates"}),"that packages related automation logic into a reusable unit. Roles enforce a consistent directory layout that Ansible understands automatically — no explicit path references needed."]}),e.jsx("h3",{style:{color:"var(--text-primary)",marginTop:"1.5rem",marginBottom:"0.5rem"},children:"Role Directory Structure"}),e.jsx(t,{items:[{name:"roles/",dir:!0,prefix:""},{name:"myrole/",dir:!0,prefix:"└── "},{name:"tasks/",dir:!0,prefix:"    ├── ",comment:"# REQUIRED: main.yml auto-loaded at play start"},{name:"main.yml",prefix:"    │   ├── ",comment:"# entry point — import other task files from here"},{name:"install.yml",prefix:"    │   ├── "},{name:"configure.yml",prefix:"    │   └── "},{name:"handlers/",dir:!0,prefix:"    ├── ",comment:"# handlers auto-merged into play"},{name:"main.yml",prefix:"    │   └── "},{name:"defaults/",dir:!0,prefix:"    ├── ",comment:"# LOWEST priority variables (easy to override)"},{name:"main.yml",prefix:"    │   └── ",special:!0,comment:"# define role defaults here — all overridable"},{name:"vars/",dir:!0,prefix:"    ├── ",comment:"# HIGH priority variables (not meant to be overridden)"},{name:"main.yml",prefix:"    │   └── "},{name:"files/",dir:!0,prefix:"    ├── ",comment:"# static files for copy module (no path needed)"},{name:"httpd.conf",prefix:"    │   └── "},{name:"templates/",dir:!0,prefix:"    ├── ",comment:"# Jinja2 templates for template module"},{name:"nginx.conf.j2",prefix:"    │   └── "},{name:"meta/",dir:!0,prefix:"    ├── ",comment:"# role metadata and dependencies"},{name:"main.yml",prefix:"    │   └── ",special:!0,comment:"# galaxy_info + dependencies"},{name:"tests/",dir:!0,prefix:"    ├── ",comment:"# optional: test inventory + playbook"},{name:"inventory",prefix:"    │   ├── "},{name:"test.yml",prefix:"    │   └── "},{name:"README.md",prefix:"    └── ",comment:"# required for Galaxy publishing"}]}),e.jsxs(i,{type:"key",children:[e.jsx("strong",{children:"defaults vs vars — the key difference:"}),e.jsxs("ul",{style:{margin:"0.5rem 0 0",paddingLeft:"1.2rem"},children:[e.jsxs("li",{children:[e.jsx("code",{children:"defaults/main.yml"})," — precedence level 2 (lowest). Use for values you ",e.jsx("em",{children:"expect users to override"}),". Example: ",e.jsx("code",{children:"nginx_port: 80"})]}),e.jsxs("li",{children:[e.jsx("code",{children:"vars/main.yml"})," — precedence level 15 (high). Use for values that should ",e.jsx("em",{children:"not"})," be overridden. Example: internal paths the role depends on."]})]})]}),e.jsx("h3",{style:{color:"var(--text-primary)",marginTop:"1.5rem"},children:"Creating a Role"}),e.jsx(l,{language:"bash",title:"Creating and scaffolding roles",code:`# Create a role skeleton (generates all directories and empty main.yml files)
ansible-galaxy role init myrole
ansible-galaxy role init --init-path roles/ myrole   # inside roles/ dir

# The generated structure:
# myrole/
# ├── defaults/main.yml
# ├── files/
# ├── handlers/main.yml
# ├── meta/main.yml
# ├── README.md
# ├── tasks/main.yml
# ├── templates/
# ├── tests/
# │   ├── inventory
# │   └── test.yml
# └── vars/main.yml`}),e.jsx(l,{language:"yaml",filename:"roles/webserver/tasks/main.yml",code:`---
# tasks/main.yml — role entry point
# Import sub-task files by phase
- name: Import installation tasks
  ansible.builtin.import_tasks: install.yml
  tags: [install]

- name: Import configuration tasks
  ansible.builtin.import_tasks: configure.yml
  tags: [configure]

- name: Import service tasks
  ansible.builtin.import_tasks: service.yml
  tags: [service]`}),e.jsx(l,{language:"yaml",filename:"roles/webserver/tasks/install.yml",code:`---
# tasks/install.yml — installation phase
- name: Install web server packages
  ansible.builtin.dnf:
    name: "{{ webserver_packages }}"
    state: present

- name: Install optional modules
  ansible.builtin.dnf:
    name: "{{ item }}"
    state: present
  loop: "{{ webserver_optional_modules }}"
  when: webserver_optional_modules | length > 0`}),e.jsx(l,{language:"yaml",filename:"roles/webserver/defaults/main.yml",code:`---
# defaults/main.yml — easily overridable defaults
webserver_packages:
  - httpd
  - mod_ssl

webserver_optional_modules: []

webserver_port: 80
webserver_ssl_port: 443
webserver_root: /var/www/html
webserver_server_name: "{{ ansible_fqdn }}"

webserver_enable_ssl: false
webserver_ssl_cert: /etc/pki/tls/certs/localhost.crt
webserver_ssl_key: /etc/pki/tls/private/localhost.key`}),e.jsx(l,{language:"yaml",filename:"roles/webserver/handlers/main.yml",code:`---
# handlers/main.yml — handlers are auto-available to the play
- name: Restart httpd
  ansible.builtin.service:
    name: httpd
    state: restarted

- name: Reload httpd
  ansible.builtin.service:
    name: httpd
    state: reloaded

- name: Validate httpd config
  ansible.builtin.command: httpd -t
  changed_when: false`}),e.jsx(l,{language:"yaml",filename:"roles/webserver/meta/main.yml",code:`---
# meta/main.yml — role metadata and dependencies
galaxy_info:
  author: your_username
  description: Configure Apache HTTP Server on RHEL/CentOS
  company: Example Corp
  license: Apache-2.0
  min_ansible_version: "2.9"
  platforms:
    - name: EL                  # Enterprise Linux
      versions:
        - "8"
        - "9"
  galaxy_tags:
    - web
    - httpd
    - apache

# Role dependencies — installed/run BEFORE this role
dependencies:
  - role: common                # another local role
  - role: geerlingguy.firewall  # Galaxy role
    vars:
      firewall_allowed_tcp_ports: ["80", "443"]`}),e.jsx("h3",{style:{color:"var(--text-primary)",marginTop:"1.5rem"},children:"Using Roles in Playbooks"}),e.jsx(l,{language:"yaml",filename:"site.yml",code:`---
- name: Configure web servers
  hosts: webservers
  become: true

  # ── METHOD 1: roles key (runs before tasks) ───────────────
  roles:
    - common                      # simple: just role name
    - role: webserver             # full form
      vars:
        webserver_port: 8080      # override defaults
        webserver_enable_ssl: true
      tags: [web]

    - role: security
      when: apply_hardening | default(true)

  # ── METHOD 2: import_role (in tasks section) ──────────────
  tasks:
    - name: Apply webserver role
      ansible.builtin.import_role:
        name: webserver
      vars:
        webserver_port: 9090

    # ── METHOD 3: include_role (dynamic, supports loops/when) ─
    - name: Apply role for each environment
      ansible.builtin.include_role:
        name: "{{ item }}_setup"
      loop: [dev, staging, prod]
      loop_control:
        loop_var: item

# ── ROLE SEARCH ORDER ─────────────────────────────────────────
# Ansible looks for roles in this order:
# 1. roles/ directory relative to the playbook
# 2. ./roles/ in ansible.cfg's roles_path
# 3. ~/.ansible/roles
# 4. /usr/share/ansible/roles
# 5. /etc/ansible/roles

# In ansible.cfg:
# [defaults]
# roles_path = ./roles:~/.ansible/roles`})]}),r==="galaxy"&&e.jsxs(e.Fragment,{children:[e.jsx("h2",{className:"section-title",children:"Ansible Galaxy"}),e.jsxs("p",{children:["Ansible Galaxy (",e.jsx("code",{children:"galaxy.ansible.com"}),") is the community hub for sharing Ansible roles and collections. You can use ",e.jsx("code",{children:"ansible-galaxy"})," to install community content and publish your own."]}),e.jsx(l,{language:"bash",title:"ansible-galaxy role commands",code:`# ── SEARCH AND INFO ───────────────────────────────────────────
# Search Galaxy for roles
ansible-galaxy role search nginx

# Show info about a specific role
ansible-galaxy role info geerlingguy.nginx

# ── INSTALL ROLES ──────────────────────────────────────────────
# Install a single role
ansible-galaxy role install geerlingguy.nginx

# Install a specific version
ansible-galaxy role install geerlingguy.nginx,3.2.0

# Install into a specific path
ansible-galaxy role install geerlingguy.nginx -p roles/

# Install from requirements.yml
ansible-galaxy role install -r requirements.yml

# Install from requirements.yml into a specific path
ansible-galaxy role install -r requirements.yml -p roles/

# ── LIST INSTALLED ROLES ───────────────────────────────────────
ansible-galaxy role list

# ── REMOVE A ROLE ─────────────────────────────────────────────
ansible-galaxy role remove geerlingguy.nginx

# ── INIT A NEW ROLE ───────────────────────────────────────────
ansible-galaxy role init myrole
ansible-galaxy role init --init-path ./roles myrole

# ── DEFAULT INSTALL PATH ──────────────────────────────────────
# Roles are installed to ~/.ansible/roles by default
# Override in ansible.cfg:
#   [defaults]
#   roles_path = ./roles

# ── PRIVATE/CUSTOM SERVER ──────────────────────────────────────
# Install from a custom Galaxy server (Automation Hub)
ansible-galaxy role install myrole -s https://hub.example.com`}),e.jsxs(i,{type:"tip",children:["When working on the exam, you may need to install roles from a local",e.jsx("code",{children:" requirements.yml"})," file pointing to a ",e.jsx("em",{children:"private"})," server or local paths. Use ",e.jsx("code",{children:"ansible-galaxy role install -r requirements.yml"}),"."]}),e.jsx(l,{language:"bash",title:"ansible-galaxy collection commands",code:`# ── INSTALL COLLECTIONS ───────────────────────────────────────
# Install a single collection (namespace.collection format)
ansible-galaxy collection install ansible.posix
ansible-galaxy collection install community.general
ansible-galaxy collection install redhat.rhel_system_roles

# Install a specific version
ansible-galaxy collection install ansible.posix:==1.5.4

# Install from requirements.yml
ansible-galaxy collection install -r requirements.yml

# Install to a specific path
ansible-galaxy collection install ansible.posix -p ./collections

# ── LIST INSTALLED COLLECTIONS ────────────────────────────────
ansible-galaxy collection list

# Show collection info
ansible-galaxy collection info ansible.posix

# ── DEFAULT INSTALL PATH ──────────────────────────────────────
# ~/.ansible/collections/ansible_collections/
# Override in ansible.cfg:
#   [defaults]
#   collections_path = ./collections

# ── FROM AUTOMATION HUB (Red Hat's private Galaxy) ────────────
# Configure in ansible.cfg or ansible-navigator.yml:
# [galaxy]
# server_list = automation_hub
#
# [galaxy_server.automation_hub]
# url = https://cloud.redhat.com/api/automation-hub/
# auth_url = https://sso.redhat.com/...
# token = <your-token>`})]}),r==="collections"&&e.jsxs(e.Fragment,{children:[e.jsx("h2",{className:"section-title",children:"Content Collections"}),e.jsxs("p",{children:["Collections are the ",e.jsx("strong",{children:"packaging format"})," for distributing Ansible content: modules, roles, plugins, playbooks, and documentation — all under a",e.jsx("code",{children:" namespace.collection"})," namespace. They replace the old approach of bundling everything in a single Ansible release."]}),e.jsxs("div",{style:{background:"var(--bg-card)",border:"1px solid var(--border-subtle)",borderRadius:"var(--radius-lg)",padding:"1.5rem",margin:"1rem 0"},children:[e.jsx("h3",{style:{color:"var(--accent-sky)",marginBottom:"1rem",fontSize:"0.95rem"},children:"Collection Namespace Structure"}),e.jsxs("div",{style:{fontFamily:"var(--font-mono)",fontSize:"0.85rem",lineHeight:"2"},children:[e.jsx("div",{style:{color:"#fbbf24",fontWeight:700},children:"ansible.builtin"}),e.jsx("div",{style:{color:"var(--text-muted)",paddingLeft:"1rem",fontSize:"0.78rem"},children:"↳ namespace: ansible  |  collection: builtin  |  ships with Ansible core"}),e.jsx("div",{style:{color:"#34d399",fontWeight:700,marginTop:"8px"},children:"ansible.posix"}),e.jsx("div",{style:{color:"var(--text-muted)",paddingLeft:"1rem",fontSize:"0.78rem"},children:"↳ POSIX modules: mount, firewalld, authorized_key, acl, seboolean..."}),e.jsx("div",{style:{color:"#818cf8",fontWeight:700,marginTop:"8px"},children:"community.general"}),e.jsx("div",{style:{color:"var(--text-muted)",paddingLeft:"1rem",fontSize:"0.78rem"},children:"↳ large community collection: parted, lvg, lvol, archive, sefcontext..."}),e.jsx("div",{style:{color:"#c084fc",fontWeight:700,marginTop:"8px"},children:"redhat.rhel_system_roles"}),e.jsx("div",{style:{color:"var(--text-muted)",paddingLeft:"1rem",fontSize:"0.78rem"},children:"↳ Red Hat supported roles: network, storage, selinux, timesync..."})]})]}),e.jsx("h3",{style:{color:"var(--text-primary)",marginTop:"1.5rem"},children:"Using Collections in Playbooks"}),e.jsx(l,{language:"yaml",filename:"examples/using-collections.yml",code:`---
# ── METHOD 1: FQCN (Fully Qualified Collection Name) ──────────
# Always use FQCN — avoids ambiguity when multiple collections
# define modules with the same short name
- name: Use FQCN for all modules
  hosts: all
  become: true
  tasks:
    - ansible.builtin.dnf:          # always available, no install needed
        name: httpd
        state: present

    - ansible.posix.firewalld:      # from ansible.posix collection
        service: http
        state: enabled
        permanent: true
        immediate: true

    - community.general.lvol:       # from community.general
        vg: datavg
        lv: datalv
        size: 10g

    - ansible.posix.authorized_key: # from ansible.posix
        user: deployer
        key: "{{ lookup('file', 'keys/deployer.pub') }}"

# ── METHOD 2: collections keyword (shorthand) ─────────────────
# Specify collections at play level — then use short names
# (less safe — avoid on exam to prevent ambiguity)
- name: Using collections keyword
  hosts: all
  collections:
    - ansible.posix
    - community.general
  tasks:
    - firewalld:           # now resolves to ansible.posix.firewalld
        service: https
        state: enabled
        permanent: true
        immediate: true

    - lvol:               # resolves to community.general.lvol
        vg: myvg
        lv: mylv
        size: 5g

# ── FINDING MODULES IN A COLLECTION ───────────────────────────
# ansible-navigator doc ansible.posix.firewalld
# ansible-navigator doc -l            # list all available modules
# ansible-navigator doc -l --mode stdout | grep firewalld`}),e.jsx("h3",{style:{color:"var(--text-primary)",marginTop:"1.5rem"},children:"Collection File Layout"}),e.jsx(t,{items:[{name:"collections/",dir:!0,prefix:""},{name:"ansible_collections/",dir:!0,prefix:"└── "},{name:"namespace/",dir:!0,prefix:"    └── "},{name:"collection_name/",dir:!0,prefix:"        └── "},{name:"plugins/",dir:!0,prefix:"            ├── ",comment:"# modules, callbacks, inventory..."},{name:"modules/",dir:!0,prefix:"            │   └── "},{name:"roles/",dir:!0,prefix:"            ├── ",comment:"# bundled roles"},{name:"playbooks/",dir:!0,prefix:"            ├── ",comment:"# bundled playbooks"},{name:"docs/",dir:!0,prefix:"            ├── "},{name:"tests/",dir:!0,prefix:"            ├── "},{name:"galaxy.yml",prefix:"            └── ",special:!0,comment:"# collection metadata"}]}),e.jsxs(i,{type:"exam",children:["On the exam, you'll likely need to: (1) use ",e.jsx("code",{children:"ansible-navigator doc"})," to find module parameters, (2) install a collection from a requirements file, and (3) use modules from ",e.jsx("code",{children:"ansible.posix"})," and ",e.jsx("code",{children:"community.general"}),"with their full FQCN. Always use FQCN in your playbooks."]})]}),r==="requirements"&&e.jsxs(e.Fragment,{children:[e.jsx("h2",{className:"section-title",children:"requirements.yml"}),e.jsxs("p",{children:["A ",e.jsx("code",{children:"requirements.yml"})," file declares all the roles and collections your project needs. It's the standard way to distribute dependency lists and is processed by ",e.jsx("code",{children:"ansible-galaxy"}),"."]}),e.jsx(l,{language:"yaml",filename:"requirements.yml",code:`---
# requirements.yml — declares all external dependencies
# Install with: ansible-galaxy install -r requirements.yml
# For collections: ansible-galaxy collection install -r requirements.yml
# For both:       ansible-galaxy install -r requirements.yml  (Ansible 2.10+)

# ── ROLES ─────────────────────────────────────────────────────
roles:
  # From Galaxy by name
  - name: geerlingguy.nginx

  # Specific version
  - name: geerlingguy.mysql
    version: "3.3.2"

  # From a Git repository (commit, branch, or tag)
  - name: my_custom_role
    src: https://github.com/example/ansible-role-custom.git
    version: main    # can be a tag, branch, or commit SHA
    scm: git

  # From a tarball URL
  - name: special_role
    src: https://example.com/roles/special_role.tar.gz

  # Local path (useful for monorepos)
  - name: local_role
    src: /path/to/local/role

# ── COLLECTIONS ───────────────────────────────────────────────
collections:
  # From Galaxy/Automation Hub
  - name: ansible.posix
    version: ">=1.4.0"

  - name: community.general
    version: ">=6.0.0"

  - name: redhat.rhel_system_roles

  # From a Git repository
  - name: my_org.internal_collection
    source: https://github.com/myorg/ansible-collection-internal.git
    type: git
    version: v1.2.0

  # From a URL
  - name: special.collection
    source: https://example.com/collections/special-1.0.0.tar.gz
    type: url`}),e.jsx(l,{language:"bash",title:"Installing from requirements.yml",code:`# Install BOTH roles and collections from requirements.yml
ansible-galaxy install -r requirements.yml

# Install only collections
ansible-galaxy collection install -r requirements.yml

# Install to a project-local path (recommended for exam scenarios)
ansible-galaxy install -r requirements.yml -p ./roles
ansible-galaxy collection install -r requirements.yml -p ./collections

# Force re-install (even if already installed)
ansible-galaxy install -r requirements.yml --force

# Verify what's installed
ansible-galaxy role list
ansible-galaxy collection list`}),e.jsx("h3",{style:{color:"var(--text-primary)",marginTop:"1.5rem"},children:"Project Layout with Requirements"}),e.jsx(t,{items:[{name:"my-project/",dir:!0,prefix:""},{name:"ansible.cfg",prefix:"├── ",special:!0,comment:"# roles_path = ./roles, collections_path = ./collections"},{name:"requirements.yml",prefix:"├── ",special:!0,comment:"# all external deps declared here"},{name:"site.yml",prefix:"├── "},{name:"inventory/",dir:!0,prefix:"├── "},{name:"hosts",prefix:"│   └── "},{name:"roles/",dir:!0,prefix:"├── ",comment:"# local roles AND installed from requirements.yml"},{name:"my_local_role/",dir:!0,prefix:"│   ├── "},{name:"geerlingguy.nginx/",dir:!0,prefix:"│   └── ",comment:"# installed by ansible-galaxy"},{name:"collections/",dir:!0,prefix:"└── ",comment:"# installed collections"},{name:"ansible_collections/",dir:!0,prefix:"    └── "},{name:"ansible/",dir:!0,prefix:"        └── "},{name:"posix/",dir:!0,prefix:"            └── ",comment:"# ansible.posix collection"}]}),e.jsx(l,{language:"ini",filename:"ansible.cfg",code:`[defaults]
# Point Ansible to local directories for offline/isolated use
roles_path       = ./roles
collections_path = ./collections
inventory        = ./inventory/hosts

# This lets you use roles installed by:
#   ansible-galaxy role install -r requirements.yml -p ./roles
# And collections installed by:
#   ansible-galaxy collection install -r requirements.yml -p ./collections`})]})]})}export{y as default};
