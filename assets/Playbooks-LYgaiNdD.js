import{r as c,j as e}from"./index-V6pXZagA.js";import{P as m,C as s}from"./CodeBlock-ClK0BBrp.js";import{I as l}from"./InfoBox-D5QG7ZYC.js";function n({number:a,label:o,detail:i,color:t="#818cf8",last:r=!1}){return e.jsxs("div",{style:{display:"flex",gap:"16px",alignItems:"flex-start"},children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",flexShrink:0},children:[e.jsx("div",{style:{width:"36px",height:"36px",borderRadius:"50%",background:`${t}22`,border:`2px solid ${t}`,display:"flex",alignItems:"center",justifyContent:"center",color:t,fontWeight:700,fontSize:"0.85rem",fontFamily:"var(--font-mono)"},children:a}),!r&&e.jsx("div",{style:{width:"2px",height:"40px",background:`${t}44`,marginTop:"4px"}})]}),e.jsxs("div",{style:{paddingTop:"6px",paddingBottom:r?0:"24px"},children:[e.jsx("div",{style:{color:"var(--text-primary)",fontWeight:600,fontSize:"0.9rem"},children:o}),i&&e.jsx("div",{style:{color:"var(--text-secondary)",fontSize:"0.82rem",marginTop:"4px",lineHeight:"1.6"},children:i})]})]})}function g(){const[a,o]=c.useState("structure"),i=[{key:"structure",label:"Play Structure"},{key:"handlers",label:"Handlers"},{key:"tags",label:"Tags"},{key:"import-include",label:"Import vs Include"},{key:"error-handling",label:"Error Handling"},{key:"execution-control",label:"Execution Control"},{key:"delegation",label:"Delegation"}];return e.jsxs("div",{className:"page-container fade-in",children:[e.jsx(m,{title:"Plays & Playbooks",icon:"▶",description:"Master the full anatomy of Ansible plays and playbooks: task structure, handlers, tags, import/include, block/rescue/always error handling, and execution control.",tags:["Play","Tasks","Handlers","Tags","Block","Rescue","Serial","delegate_to"]}),e.jsx("div",{style:{display:"flex",gap:"6px",flexWrap:"wrap",marginBottom:"1.5rem"},children:i.map(t=>e.jsx("button",{onClick:()=>o(t.key),style:{padding:"7px 16px",borderRadius:"var(--radius-md)",border:`1px solid ${a===t.key?"var(--accent-primary)":"var(--border-subtle)"}`,background:a===t.key?"var(--accent-primary-subtle)":"var(--bg-card)",color:a===t.key?"var(--accent-primary)":"var(--text-muted)",fontSize:"0.8rem",fontWeight:600,cursor:"pointer",transition:"all 150ms"},children:t.label},t.key))}),a==="structure"&&e.jsxs(e.Fragment,{children:[e.jsx("h2",{className:"section-title",children:"Anatomy of a Playbook"}),e.jsxs("p",{children:["A ",e.jsx("strong",{children:"playbook"})," is a YAML file containing one or more ",e.jsx("strong",{children:"plays"}),". Each play maps a set of ",e.jsx("strong",{children:"tasks"})," to a group of managed hosts. Tasks execute in order — Ansible runs them sequentially on each host by default."]}),e.jsxs("div",{style:{background:"var(--bg-card)",border:"1px solid var(--border-subtle)",borderRadius:"var(--radius-lg)",padding:"1.5rem",margin:"1.5rem 0"},children:[e.jsx("h3",{style:{color:"var(--accent-primary)",marginBottom:"1rem",fontSize:"0.9rem"},children:"Playbook Execution Flow"}),e.jsx(n,{number:"1",label:"Inventory parsing",detail:"Ansible resolves which hosts match the 'hosts' pattern. Groups, host_vars, group_vars are loaded.",color:"#38bdf8"}),e.jsx(n,{number:"2",label:"pre_tasks",detail:"Tasks that run before roles and regular tasks. Handlers triggered here fire immediately.",color:"#818cf8"}),e.jsx(n,{number:"3",label:"roles",detail:"Roles execute in order listed. Each role's tasks/main.yml runs.",color:"#a78bfa"}),e.jsx(n,{number:"4",label:"tasks",detail:"Regular play tasks run sequentially.",color:"#818cf8"}),e.jsx(n,{number:"5",label:"post_tasks",detail:"Tasks that run after all other tasks. Useful for verification.",color:"#818cf8"}),e.jsx(n,{number:"6",label:"Handlers flush",detail:"All notified handlers run at the end of the play (in order they were defined, not notified).",color:"#34d399",last:!0})]}),e.jsx(s,{language:"yaml",filename:"site.yml",code:`---
# A playbook is a list (starts with ---) of plays
# Each play is a dict with these top-level keys:

- name: Configure web servers          # Human-readable description
  hosts: webservers                    # inventory group or host pattern
  gather_facts: true                   # default: gather system info (facts)
  become: true                         # escalate to root for all tasks
  become_method: sudo                  # how to escalate (sudo, su, pbrun...)
  become_user: root                    # who to become (default: root)
  serial: 2                            # process 2 hosts at a time (rolling update)
  max_fail_percentage: 25              # abort if more than 25% of hosts fail
  any_errors_fatal: false              # default: continue on other hosts if one fails
  ignore_errors: false                 # default: tasks stop on error
  order: inventory                     # host order: inventory, sorted, reverse_sorted, shuffle
  tags: [web, configure]               # tags for this entire play

  # ── VARIABLE DEFINITIONS ───────────────────────────────────
  vars:
    app_name: mywebapp
    app_port: 8080
    vhost_config:
      server_name: "{{ inventory_hostname }}"
      document_root: /var/www/html

  vars_files:
    - vars/common.yml
    - vars/secrets.yml     # typically Vault-encrypted

  vars_prompt:
    - name: admin_password
      prompt: "Admin password?"
      private: true

  # ── ENVIRONMENT VARIABLES for all tasks ──────────────────
  environment:
    http_proxy: "http://proxy.example.com:8080"
    JAVA_HOME: /usr/lib/jvm/java-11

  # ── PRE-TASKS run before roles ────────────────────────────
  pre_tasks:
    - name: Ensure firewalld is running before configuration
      ansible.builtin.service:
        name: firewalld
        state: started

  # ── ROLES execute here ────────────────────────────────────
  roles:
    - common
    - { role: nginx, tags: [nginx] }
    - role: app
      vars:
        app_version: "2.5.0"

  # ── MAIN TASKS ────────────────────────────────────────────
  tasks:
    - name: Deploy application configuration
      ansible.builtin.template:
        src: app.conf.j2
        dest: /etc/myapp/config.conf
        owner: root
        group: root
        mode: '0644'
        validate: /usr/bin/myapp --check-config %s  # validate before putting in place
      notify:
        - Restart myapp
        - Clear cache

    - name: Ensure app is running and enabled
      ansible.builtin.service:
        name: myapp
        state: started
        enabled: true

  # ── POST-TASKS run after everything ───────────────────────
  post_tasks:
    - name: Verify app responds on port {{ app_port }}
      ansible.builtin.uri:
        url: "http://localhost:{{ app_port }}/health"
        status_code: 200
      retries: 5
      delay: 3

  # ── HANDLERS (triggered by notify, run once at play end) ──
  handlers:
    - name: Restart myapp
      ansible.builtin.service:
        name: myapp
        state: restarted

    - name: Clear cache
      ansible.builtin.command: /usr/bin/myapp --clear-cache


# ── A SECOND PLAY in the same playbook ────────────────────────
- name: Configure database servers
  hosts: dbservers
  become: true
  tasks:
    - name: Install PostgreSQL
      ansible.builtin.dnf:
        name: postgresql-server
        state: present`}),e.jsx("h3",{style:{color:"var(--text-primary)",marginTop:"1.5rem"},children:"Task-Level Keywords"}),e.jsx(s,{language:"yaml",filename:"examples/task-anatomy.yml",code:`tasks:
  - name: A fully annotated task
    ansible.builtin.dnf:         # the module to call
      name: httpd
      state: present

    # ── WHEN THIS TASK RUNS ─────────────────────────────────
    when: ansible_os_family == "RedHat"

    # ── LOOP ────────────────────────────────────────────────
    loop: [httpd, mod_ssl, php]
    loop_control:
      label: "{{ item }}"

    # ── BECOME (override play-level) ────────────────────────
    become: true
    become_user: root

    # ── ENVIRONMENT VARIABLES ───────────────────────────────
    environment:
      MYVAR: somevalue

    # ── CAPTURE OUTPUT ──────────────────────────────────────
    register: install_result

    # ── IGNORE ERRORS ───────────────────────────────────────
    ignore_errors: true

    # ── CUSTOM FAIL CONDITION ───────────────────────────────
    failed_when: install_result.rc != 0 and install_result.rc != 100

    # ── CUSTOM CHANGED CONDITION ────────────────────────────
    changed_when: '"changed" in install_result.stdout'

    # ── TAGS ────────────────────────────────────────────────
    tags: [install, packages]

    # ── NOTIFY HANDLERS ─────────────────────────────────────
    notify: Restart httpd

    # ── RUN ONCE ────────────────────────────────────────────
    run_once: true    # only runs on the first host in the play

    # ── THROTTLE ────────────────────────────────────────────
    throttle: 3       # max 3 hosts run this task simultaneously

    # ── RETRY ────────────────────────────────────────────────
    retries: 3        # retry up to 3 times if it fails
    delay: 10         # wait 10s between retries
    until: install_result.rc == 0`})]}),a==="handlers"&&e.jsxs(e.Fragment,{children:[e.jsx("h2",{className:"section-title",children:"Handlers"}),e.jsxs("p",{children:["Handlers are tasks that only run when ",e.jsx("strong",{children:"notified"})," by another task. They are ideal for actions that should happen ",e.jsx("em",{children:"only when something changed"}),", like restarting a service after a config file is updated."]}),e.jsxs(l,{type:"key",children:["Handlers run ",e.jsx("strong",{children:"once at the end of the play"}),", regardless of how many tasks notify them. They run in the ",e.jsx("em",{children:"order they are defined"}),", not the order they were notified. If a play fails mid-way, pending handlers do NOT run (unless",e.jsx("code",{children:" --force-handlers"})," is passed)."]}),e.jsx(s,{language:"yaml",filename:"examples/handlers.yml",code:`---
- name: Handler examples
  hosts: webservers
  become: true

  tasks:
    # Multiple tasks can notify the same handler
    # The handler only runs ONCE at the end
    - name: Install nginx
      ansible.builtin.dnf:
        name: nginx
        state: present
      notify: Restart nginx           # single handler

    - name: Deploy nginx config
      ansible.builtin.template:
        src: nginx.conf.j2
        dest: /etc/nginx/nginx.conf
      notify:
        - Validate nginx config       # multiple handlers
        - Restart nginx               # order = definition order

    - name: Deploy SSL certificate
      ansible.builtin.copy:
        src: ssl/cert.pem
        dest: /etc/nginx/ssl/cert.pem
        mode: '0644'
      notify: Reload nginx            # reload instead of restart for certs

    # ── FLUSH HANDLERS ─────────────────────────────────────
    # Force handlers to run immediately at this point (not wait until play end)
    - name: Flush handlers mid-play
      ansible.builtin.meta: flush_handlers

    - name: Check nginx is serving (after handler has run)
      ansible.builtin.uri:
        url: http://localhost
        status_code: 200

  handlers:
    - name: Validate nginx config
      ansible.builtin.command: nginx -t
      changed_when: false

    - name: Restart nginx
      ansible.builtin.service:
        name: nginx
        state: restarted

    - name: Reload nginx
      ansible.builtin.service:
        name: nginx
        state: reloaded

    # ── LISTEN — multiple handlers respond to one notify ────
    # Notify "web config changed" and ALL handlers with listen: "web config changed" run
    - name: Clear application cache
      ansible.builtin.command: /usr/bin/app --clear-cache
      listen: "web config changed"

    - name: Warm up application cache
      ansible.builtin.command: /usr/bin/app --warm-cache
      listen: "web config changed"

    # Task that triggers both handlers above:
    # notify: web config changed

    # ── HANDLER THAT NOTIFIES ANOTHER HANDLER ───────────────
    - name: Post-restart health check
      ansible.builtin.uri:
        url: http://localhost/health
        status_code: 200
      listen: "Restart nginx"   # runs whenever 'Restart nginx' is triggered
      # Note: this runs AFTER 'Restart nginx' completes`}),e.jsxs(l,{type:"exam",children:["Common exam scenario: A config file is updated — the handler should restart the service. Make sure the ",e.jsx("code",{children:"notify"})," value in the task ",e.jsx("em",{children:"exactly matches"})," the handler's",e.jsx("code",{children:" name"})," (or ",e.jsx("code",{children:"listen"}),") — it's case-sensitive!"]})]}),a==="tags"&&e.jsxs(e.Fragment,{children:[e.jsx("h2",{className:"section-title",children:"Tags"}),e.jsx("p",{children:'Tags let you selectively run or skip parts of a playbook without editing it. Useful for running only the "install" phase, skipping "cleanup", or targeting specific components.'}),e.jsx(s,{language:"yaml",filename:"examples/tags-demo.yml",code:`---
- name: Tagged playbook example
  hosts: all
  become: true
  tags: [all]   # play-level tags apply to all tasks

  tasks:
    - name: Install required packages
      ansible.builtin.dnf:
        name: [httpd, php, mysql]
        state: present
      tags:
        - install
        - packages

    - name: Deploy application
      ansible.builtin.template:
        src: app.conf.j2
        dest: /etc/myapp/config.conf
      tags:
        - deploy
        - configure

    - name: Start services
      ansible.builtin.service:
        name: "{{ item }}"
        state: started
        enabled: true
      loop: [httpd, mysqld]
      tags:
        - services
        - start

    - name: Run smoke tests
      ansible.builtin.uri:
        url: http://localhost
        status_code: 200
      tags:
        - test
        - verify
        - never    # 'never' tag: ONLY runs when explicitly selected with --tags never

    - name: Cleanup temp files
      ansible.builtin.file:
        path: /tmp/deploy
        state: absent
      tags:
        - cleanup
        - never

    - name: This task always runs (ignores --tags)
      ansible.builtin.debug:
        msg: "Always executing"
      tags:
        - always   # 'always' tag: runs even when --tags is specified`}),e.jsx(s,{language:"bash",title:"Running playbooks with tags",code:`# Run only tasks tagged 'install' and 'packages'
ansible-playbook site.yml --tags "install,packages"

# Run only tasks tagged 'deploy'
ansible-playbook site.yml --tags deploy

# Skip tasks tagged 'test'
ansible-playbook site.yml --skip-tags test

# Skip multiple tags
ansible-playbook site.yml --skip-tags "test,cleanup"

# Run tasks tagged 'never' (smoke tests, cleanup, etc.)
ansible-playbook site.yml --tags never

# Run ONLY 'always' tagged tasks (plus any with --tags)
ansible-playbook site.yml --tags always

# See which tasks would run (dry-run with tags)
ansible-playbook site.yml --tags install --list-tasks

# List all tags in a playbook
ansible-playbook site.yml --list-tags`}),e.jsxs(l,{type:"tip",children:[e.jsx("strong",{children:"Tag strategy for the exam:"})," Use ",e.jsx("code",{children:"--tags"})," to quickly re-run just the broken section without running the entire playbook again.",e.jsx("code",{children:"--list-tasks"})," shows you exactly what will execute before committing."]})]}),a==="import-include"&&e.jsxs(e.Fragment,{children:[e.jsx("h2",{className:"section-title",children:"Import vs Include"}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem",margin:"1rem 0"},children:[{title:"import_tasks / import_playbook",subtitle:"Static — processed at parse time",color:"#818cf8",points:["Processed before the play runs","Tags on the import apply to ALL imported tasks","Can't use variables for the filename","Handlers from imported files are available play-wide","Loops don't work on import_tasks"]},{title:"include_tasks / include_playbook",subtitle:"Dynamic — processed at runtime",color:"#34d399",points:["File is loaded when the task runs","Tags on include don't apply to included tasks",'Filename can be a variable: "{{ env }}.yml"',"Can be used inside loops","ansible --list-tasks won't show included tasks"]}].map(t=>e.jsxs("div",{style:{background:"var(--bg-card)",border:`1px solid ${t.color}44`,borderRadius:"var(--radius-lg)",padding:"1.25rem"},children:[e.jsx("div",{style:{color:t.color,fontWeight:700,marginBottom:"4px"},children:t.title}),e.jsx("div",{style:{color:"var(--text-muted)",fontSize:"0.78rem",marginBottom:"1rem"},children:t.subtitle}),e.jsx("ul",{style:{margin:0,paddingLeft:"1.2rem",color:"var(--text-secondary)",fontSize:"0.85rem"},children:t.points.map((r,d)=>e.jsx("li",{style:{marginBottom:"6px"},children:r},d))})]},t.title))}),e.jsx(s,{language:"yaml",filename:"examples/import-include.yml",code:`---
# ── IMPORT_PLAYBOOK ────────────────────────────────────────────
# Use at the top level to compose multiple playbooks
- import_playbook: playbooks/common.yml
- import_playbook: playbooks/webservers.yml
- import_playbook: "playbooks/{{ role_name }}.yml"   # ERROR: can't use vars

# ── IN A PLAY'S TASKS ─────────────────────────────────────────
- name: Compose plays with import and include
  hosts: all
  become: true

  tasks:
    # STATIC import — tags 'install' apply to ALL tasks inside
    - name: Import the install tasks
      ansible.builtin.import_tasks: tasks/install.yml
      tags: [install]

    # DYNAMIC include — tags must be on the included tasks themselves
    - name: Include environment-specific tasks
      ansible.builtin.include_tasks: "tasks/{{ ansible_os_family }}.yml"

    # include_tasks with a loop (can't do this with import_tasks!)
    - name: Include per-service tasks
      ansible.builtin.include_tasks: tasks/service_setup.yml
      loop: [httpd, nginx, redis]
      loop_control:
        loop_var: svc_name

    # Passing variables into included tasks
    - name: Include with vars
      ansible.builtin.include_tasks: tasks/configure.yml
      vars:
        config_file: /etc/myapp/app.conf
        debug_mode: false

# tasks/install.yml (included file — no "- name: play" header, just task list)
# - name: Install httpd
#   ansible.builtin.dnf:
#     name: httpd
#     state: present
#
# - name: Install php
#   ansible.builtin.dnf:
#     name: php
#     state: present`})]}),a==="error-handling"&&e.jsxs(e.Fragment,{children:[e.jsx("h2",{className:"section-title",children:"Error Handling"}),e.jsx("p",{children:"By default, Ansible stops executing on a host when any task fails. Error handling gives you fine-grained control over what counts as a failure and what to do when things go wrong."}),e.jsx(s,{language:"yaml",filename:"examples/error-handling.yml",code:`---
- name: Error handling patterns
  hosts: all
  become: true

  tasks:

    # ── IGNORE ERRORS ────────────────────────────────────────
    # Task fails but play continues; result.failed == True
    - name: Try to stop a service that might not exist
      ansible.builtin.service:
        name: optional-service
        state: stopped
      ignore_errors: true
      register: stop_result

    - name: Check if we ignored an error
      ansible.builtin.debug:
        msg: "Service stop failed (that's OK): {{ stop_result.msg }}"
      when: stop_result is failed

    # ── CUSTOM FAIL CONDITION ────────────────────────────────
    # A command might return non-zero but we consider it OK
    - name: Check if process is running
      ansible.builtin.command: pgrep myapp
      register: pgrep_result
      failed_when:
        - pgrep_result.rc != 0        # process not found
        - pgrep_result.rc != 1        # pgrep specific: 1 = no match (not an error)
      changed_when: false

    # Simpler with a list (failed when ANY condition is true):
    - name: Run app validation
      ansible.builtin.command: /usr/bin/myapp --validate
      register: validate_out
      failed_when: >
        validate_out.rc != 0 and
        'WARN' not in validate_out.stdout

    # ── CUSTOM CHANGED CONDITION ─────────────────────────────
    # Mark a task as 'changed' only when certain output appears
    - name: Apply database migrations
      ansible.builtin.command: /usr/bin/myapp --migrate
      register: migrate_out
      changed_when: '"Applied" in migrate_out.stdout'
      # Without this, 'command' is always reported as 'changed'

    # ── BLOCK / RESCUE / ALWAYS ──────────────────────────────
    # try/except/finally equivalent in Ansible
    - name: Deploy application safely
      block:
        # Tasks in 'block' run sequentially
        - name: Download release artifact
          ansible.builtin.get_url:
            url: "https://releases.example.com/myapp-{{ version }}.tar.gz"
            dest: /tmp/myapp.tar.gz

        - name: Extract artifact
          ansible.builtin.unarchive:
            src: /tmp/myapp.tar.gz
            dest: /opt/myapp
            remote_src: true

        - name: Run install script
          ansible.builtin.command: /opt/myapp/install.sh

      rescue:
        # Runs ONLY if a task in 'block' fails
        - name: Log the failure
          ansible.builtin.copy:
            content: "Deployment failed at {{ ansible_date_time.iso8601 }}"
            dest: /var/log/deploy-failure.log

        - name: Roll back to previous version
          ansible.builtin.command: /opt/myapp/rollback.sh

        # Re-raise the error after rescue (uncomment to propagate failure)
        # - name: Propagate the error
        #   ansible.builtin.fail:
        #     msg: "Deployment failed and was rolled back"

      always:
        # Runs ALWAYS — whether block succeeded or rescue ran
        - name: Cleanup temp files
          ansible.builtin.file:
            path: /tmp/myapp.tar.gz
            state: absent

        - name: Send deployment notification
          ansible.builtin.uri:
            url: https://hooks.slack.com/services/XXX
            method: POST
            body_format: json
            body:
              text: "Deployment {{ 'succeeded' if not ansible_failed_task else 'FAILED' }}"
          ignore_errors: true   # don't fail the play if Slack is unreachable

    # ── ANSIBLE.BUILTIN.FAIL ─────────────────────────────────
    # Explicitly fail with a message when a condition is met
    - name: Abort if disk is nearly full
      ansible.builtin.fail:
        msg: "Root filesystem is {{ disk_use }}% full — aborting deployment!"
      vars:
        disk_use: "{{ ansible_mounts | selectattr('mount', 'equalto', '/') | map(attribute='size_used') | first }}"
      when: (disk_use | int) > 90

    # ── ANY ERRORS FATAL ─────────────────────────────────────
    # Applied at play level — if ANY host fails, stop all hosts
    # any_errors_fatal: true  (in play definition)

    # ── MAX FAIL PERCENTAGE ──────────────────────────────────
    # Applied at play level — abort if more than X% fail
    # max_fail_percentage: 30  (in play definition)`}),e.jsxs(l,{type:"warning",children:[e.jsx("strong",{children:`Rescue tasks don't clear "failed" status by default.`})," If the rescue block completes successfully, the host continues as if it hadn't failed. But if you want to mark the play as failed even after rescue, add an explicit",e.jsx("code",{children:" ansible.builtin.fail"})," task inside the rescue block."]})]}),a==="execution-control"&&e.jsxs(e.Fragment,{children:[e.jsx("h2",{className:"section-title",children:"Execution Control"}),e.jsxs("p",{children:["Control ",e.jsx("em",{children:"how many hosts"})," run tasks simultaneously, implement rolling updates, and manage host ordering."]}),e.jsx(s,{language:"yaml",filename:"examples/execution-control.yml",code:`---
# ── SERIAL — rolling updates ───────────────────────────────────
# Run the play on N hosts at a time (rolling update pattern)
- name: Rolling update web servers
  hosts: webservers
  serial: 2            # process 2 hosts at a time
  # serial: "25%"      # or a percentage of total hosts
  # serial:            # or a list: 1 first, then 3 at a time, then all
  #   - 1
  #   - 3
  #   - "100%"

  max_fail_percentage: 0   # abort entire play if ANY host fails

  tasks:
    - name: Take host out of load balancer
      community.general.haproxy:
        state: disabled
        host: "{{ inventory_hostname }}"
        socket: /var/run/haproxy/admin.sock
      delegate_to: loadbalancer.example.com

    - name: Update the application
      ansible.builtin.dnf:
        name: myapp
        state: latest

    - name: Restart application
      ansible.builtin.service:
        name: myapp
        state: restarted

    - name: Health check
      ansible.builtin.uri:
        url: "http://{{ ansible_default_ipv4.address }}/health"
        status_code: 200
      retries: 5
      delay: 3

    - name: Put host back in load balancer
      community.general.haproxy:
        state: enabled
        host: "{{ inventory_hostname }}"
        socket: /var/run/haproxy/admin.sock
      delegate_to: loadbalancer.example.com

# ── RUN_ONCE ───────────────────────────────────────────────────
- name: Database schema migration (run once for all hosts)
  hosts: dbservers
  tasks:
    - name: Apply schema migration
      ansible.builtin.command: /usr/bin/myapp --migrate
      run_once: true           # only runs on the first host in the play
      # run_once + delegate_to: run on a specific host
      delegate_to: db-primary.example.com

# ── THROTTLE ───────────────────────────────────────────────────
- name: Restart services with throttling
  hosts: all
  tasks:
    - name: Restart memcached (max 3 at a time across ALL hosts)
      ansible.builtin.service:
        name: memcached
        state: restarted
      throttle: 3     # global across all forks

# ── ORDER ──────────────────────────────────────────────────────
- name: Process hosts in sorted order
  hosts: webservers
  order: sorted           # options: inventory, sorted, reverse_sorted,
  tasks:                  #          reverse_inventory, shuffle
    - ansible.builtin.debug:
        msg: "{{ inventory_hostname }}"`})]}),a==="delegation"&&e.jsxs(e.Fragment,{children:[e.jsx("h2",{className:"section-title",children:"Delegation"}),e.jsxs("p",{children:[e.jsx("code",{children:"delegate_to"})," runs a task on a ",e.jsx("em",{children:"different host"})," than the one the play is targeting. All the target host's variables are still available — only the execution location changes. Essential for load balancer management, DNS updates, and centralized logging."]}),e.jsx(s,{language:"yaml",filename:"examples/delegation.yml",code:`---
- name: Delegation examples
  hosts: webservers
  become: true

  tasks:

    # ── BASIC DELEGATION ─────────────────────────────────────
    # Run this task on 'db-server' but using webserver's variables
    - name: Add webserver to monitoring database
      ansible.builtin.command: >
        /usr/bin/monitoring-cli add {{ inventory_hostname }} {{ ansible_default_ipv4.address }}
      delegate_to: monitoring.example.com

    # ── DELEGATE TO LOCALHOST ─────────────────────────────────
    # Run locally on the control node (very common pattern)
    - name: Create DNS record for this host (run on control node)
      ansible.builtin.uri:
        url: "https://dns-api.example.com/records"
        method: POST
        body_format: json
        body:
          hostname: "{{ inventory_hostname }}"
          ip: "{{ ansible_default_ipv4.address }}"
      delegate_to: localhost

    - name: Wait for host to become reachable
      ansible.builtin.wait_for:
        host: "{{ inventory_hostname }}"
        port: 22
        timeout: 300
      delegate_to: localhost    # port check from control node

    # ── DELEGATE_FACTS ─────────────────────────────────────
    # By default, facts from a delegated task are stored under the delegating host
    # Use delegate_facts: true to store them under the delegated-to host
    - name: Gather facts about the DB server
      ansible.builtin.setup:
      delegate_to: db-server.example.com
      delegate_facts: true     # store as hostvars['db-server.example.com']

    # Now you can access:
    - ansible.builtin.debug:
        msg: "DB server RAM: {{ hostvars['db-server.example.com']['ansible_memtotal_mb'] }} MB"

    # ── LOCAL_ACTION (shorthand for delegate_to: localhost) ──
    - name: Log to a local file
      ansible.builtin.lineinfile:
        path: /tmp/deploy-log.txt
        line: "{{ inventory_hostname }} deployed at {{ ansible_date_time.iso8601 }}"
      local_action: ansible.builtin.lineinfile   # alternative syntax
      # Equivalent to: delegate_to: localhost`}),e.jsxs(l,{type:"exam",children:["The exam commonly tests ",e.jsx("code",{children:"delegate_to: localhost"})," for tasks that should run on the ",e.jsx("strong",{children:"control node"})," (like downloading files, waiting for hosts, or making API calls from the Ansible host itself)."]})]})]})}export{g as default};
