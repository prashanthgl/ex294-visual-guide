import{r as i,j as e}from"./index-V6pXZagA.js";import{P as o,C as s}from"./CodeBlock-ClK0BBrp.js";import{I as a}from"./InfoBox-D5QG7ZYC.js";const l=["Kernel Architecture","Process Management","Filesystem Hierarchy","Storage Internals","Networking","SELinux","Systemd"];function p(){const[r,n]=i.useState("Kernel Architecture");return e.jsxs("div",{className:"page-container fade-in",children:[e.jsx(o,{title:"Linux Internals",icon:"🐧",description:"Deep dive into Linux kernel architecture, process lifecycle, filesystem hierarchy, storage, networking, SELinux, and systemd — everything you need to understand WHY Ansible tasks work the way they do.",tags:["Kernel","Processes","SELinux","LVM","Systemd","Networking"]}),e.jsx("div",{className:"section-tabs",children:l.map(t=>e.jsx("button",{className:`section-tab ${r===t?"active":""}`,onClick:()=>n(t),children:t},t))}),r==="Kernel Architecture"&&e.jsxs("div",{children:[e.jsx("h2",{className:"section-title",children:"Linux Kernel Architecture"}),e.jsxs("p",{children:["The Linux kernel is a ",e.jsx("strong",{children:"monolithic kernel"})," — meaning it runs entirely in kernel space (ring 0, privileged mode). User programs cannot directly access hardware; they must ask the kernel through ",e.jsx("em",{children:"system calls"}),". This is the fundamental security boundary of the entire operating system."]}),e.jsx("div",{className:"diagram-container",children:e.jsx("pre",{children:`
  ┌─────────────────────────────────────────────────────────────┐
  │                        USER SPACE                           │
  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
  │  │ bash/sh  │  │ ansible  │  │  httpd   │  │  sshd    │  │
  │  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘  │
  │       │              │              │              │        │
  │  ┌────▼──────────────▼──────────────▼──────────────▼────┐  │
  │  │             C Library (glibc)                         │  │
  │  └─────────────────────────┬─────────────────────────────┘  │
  └──────────────────────────  │  ───────────────────────────────┘
  ═══════════════════════════ SYSTEM CALL INTERFACE ════════════
  ┌──────────────────────────  │  ───────────────────────────────┐
  │                     KERNEL SPACE                             │
  │  ┌─────────────────────────▼─────────────────────────────┐  │
  │  │                System Call Handler                     │  │
  │  └──────┬────────────────┬────────────────┬──────────────┘  │
  │         │                │                │                  │
  │  ┌──────▼──────┐  ┌──────▼──────┐  ┌──────▼──────┐        │
  │  │  Process    │  │  Memory     │  │     VFS     │        │
  │  │  Scheduler  │  │  Manager   │  │ (Filesystem) │        │
  │  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘        │
  │         │                │                │                  │
  │  ┌──────▼────────────────▼────────────────▼──────────────┐  │
  │  │              Device Drivers / HAL                      │  │
  │  └─────────────────────────┬─────────────────────────────┘  │
  └──────────────────────────  │  ───────────────────────────────┘
  ════════════════════════ HARDWARE ════════════════════════════
  ┌───────────────────────────────────────────────────────────┐
  │   CPU     │     RAM     │    Disk    │   NIC   │   USB    │
  └───────────────────────────────────────────────────────────┘
`})}),e.jsx("h3",{className:"subsection-title",children:"Virtual File System (VFS)"}),e.jsxs("p",{children:["The VFS is an abstraction layer that allows the kernel to support many different filesystems (ext4, xfs, tmpfs, proc, sysfs) through a single interface. When you call ",e.jsx("code",{children:'open("/etc/passwd")'}),", the VFS determines which filesystem driver to use, then delegates to it. This is why ",e.jsx("code",{children:"/proc/1/status"})," and",e.jsx("code",{children:"/etc/fstab"})," look like files even though one is virtual and one is on disk."]}),e.jsx("h3",{className:"subsection-title",children:"System Calls — The Security Gateway"}),e.jsxs("p",{children:["Every privileged operation (file I/O, process creation, network socket) requires a system call. The kernel validates permissions, contexts (SELinux), and resource limits before executing. This is why ",e.jsx("code",{children:"strace"})," is so powerful — it shows every system call a process makes."]}),e.jsx(s,{language:"bash",title:"Tracing system calls",code:`# Trace all system calls made by a command
strace -c ls /etc

# Trace file-related system calls only
strace -e trace=file ls /etc

# See what files ansible reads during execution
strace -e trace=openat,read ansible --version

# Check kernel version
uname -r           # e.g., 5.14.0-284.11.1.el9_2.x86_64
uname -a           # full info: kernel, arch, date

# Kernel parameters (tunable at runtime)
sysctl -a                          # list all
sysctl vm.swappiness               # read one
sysctl -w vm.swappiness=10         # set temporarily
echo "vm.swappiness=10" >> /etc/sysctl.conf  # persist
sysctl -p                          # apply from file`}),e.jsx("h3",{className:"subsection-title",children:"Kernel Modules"}),e.jsxs("p",{children:["Drivers and filesystem support are loaded as modules — dynamically loadable code that extends the kernel without rebooting. When you add an XFS filesystem, the ",e.jsx("code",{children:"xfs"})," module must be loaded."]}),e.jsx(s,{language:"bash",title:"Kernel module management",code:`lsmod                          # list loaded modules
modinfo xfs                    # info about xfs module
modprobe xfs                   # load module + dependencies
modprobe -r xfs                # remove module
lsmod | grep xfs               # check if loaded

# Modules auto-loaded at boot
cat /etc/modules-load.d/       # directory for auto-load configs
echo "br_netfilter" > /etc/modules-load.d/br_netfilter.conf

# Module parameters
modinfo -p e1000               # show parameters for e1000 NIC driver`}),e.jsx(a,{type:"key",title:"Why This Matters for Ansible",children:e.jsxs("p",{children:["When Ansible uses the ",e.jsx("code",{children:"sysctl"})," module or modifies ",e.jsx("code",{children:"/etc/sysctl.conf"}),", it's working at the kernel parameter level. When it manages ",e.jsx("code",{children:"firewalld"}),", it's configuring the netfilter kernel subsystem. Understanding these layers helps you debug why changes persist (or don't) after reboot."]})})]}),r==="Process Management"&&e.jsxs("div",{children:[e.jsx("h2",{className:"section-title",children:"Process Lifecycle & Management"}),e.jsxs("p",{children:["Every running program is a ",e.jsx("strong",{children:"process"})," — an instance of a program in execution. The kernel manages processes in a data structure called the",e.jsx("em",{children:"process table"}),". Each process gets a unique PID (Process ID)."]}),e.jsx("h3",{className:"subsection-title",children:"Process States"}),e.jsx("div",{className:"diagram-container",children:e.jsx("pre",{children:`
   Process States in Linux:

   ┌─────────────────────────────────────────────────────────┐
   │                                                          │
   │    fork()          schedule        wait()               │
   │  CREATED  ──────►  RUNNING  ─────────────►  ZOMBIE     │
   │                       │                                  │
   │                       │  I/O wait     parent calls      │
   │                       ▼               wait() → REMOVED  │
   │                  INTERRUPTIBLE                          │
   │                    SLEEP (S)                            │
   │                       │                                  │
   │                       │  I/O done                       │
   │                       ▼                                  │
   │               UNINTERRUPTIBLE                           │
   │                  SLEEP (D)  ◄── NFS hang, disk issue    │
   │                                                          │
   │   STOPPED (T)  ◄── Ctrl+Z / SIGSTOP                    │
   │                                                          │
   └─────────────────────────────────────────────────────────┘

   D = uninterruptible sleep (waiting for I/O) — CANNOT be killed
   S = interruptible sleep (waiting for event)
   R = running or runnable
   T = stopped (by job control or debugger)
   Z = zombie (finished, parent hasn't called wait())
`})}),e.jsx(s,{language:"bash",title:"Process inspection tools",code:`# See all processes with state
ps aux               # BSD style: all processes
ps -ef               # POSIX style: full listing
ps -eo pid,ppid,state,cmd    # custom columns

# Real-time process monitor
top
htop                 # better version (may need install)

# Process state in ps output:
# R = running    S = sleeping    D = disk sleep
# T = stopped    Z = zombie      < = high priority

# Find zombie processes
ps aux | awk '$8 == "Z"'
# Or
ps -el | grep Z

# Process tree (parent/child relationships)
pstree -p            # show PIDs
pstree -p 1          # tree from systemd

# See what a process has open
lsof -p 1234         # files open by PID 1234
lsof /var/log/messages    # what has this file open
fuser /var/log/messages   # simpler: PIDs using a file`}),e.jsx("h3",{className:"subsection-title",children:"The /proc Filesystem — Live Kernel Data"}),e.jsxs("p",{children:[e.jsx("code",{children:"/proc"})," is a ",e.jsx("em",{children:"virtual filesystem"})," — its files don't exist on disk. They're generated by the kernel on demand. This is where the kernel exposes all its internal state, and it's what tools like ",e.jsx("code",{children:"ps"}),", ",e.jsx("code",{children:"top"}),", and Ansible facts use internally."]}),e.jsx(s,{language:"bash",title:"Exploring /proc",code:`# Every running process has a directory: /proc/<PID>/
ls /proc/1/           # PID 1 = systemd

# Key files:
cat /proc/1/status    # process status, memory, state
cat /proc/1/cmdline   # command line (null-separated)
cat /proc/1/environ   # environment variables
ls /proc/1/fd/        # open file descriptors (symlinks)
cat /proc/1/maps      # memory maps

# System-wide information
cat /proc/cpuinfo     # CPU details (ansible uses this for facts)
cat /proc/meminfo     # memory info
cat /proc/mounts      # currently mounted filesystems
cat /proc/net/dev     # network interface stats
cat /proc/sys/        # kernel parameters (writable via sysctl)
cat /proc/loadavg     # 1/5/15 min load averages
cat /proc/uptime      # seconds since boot

# Check if a PID exists
test -d /proc/1234 && echo "running" || echo "not running"`}),e.jsx("h3",{className:"subsection-title",children:"Signals"}),e.jsxs("p",{children:["Signals are the IPC (inter-process communication) mechanism for notifying processes about events. When you press ",e.jsx("kbd",{children:"Ctrl+C"}),", the terminal sends SIGINT to the foreground process. Ansible's ",e.jsx("code",{children:"command"})," and ",e.jsx("code",{children:"shell"})," modules receive signals when plays are interrupted."]}),e.jsx(s,{language:"bash",title:"Signals and kill",code:`# List all signals
kill -l

# Common signals:
# 1  SIGHUP   — reload config (many daemons respond to this)
# 2  SIGINT   — interrupt (Ctrl+C)
# 9  SIGKILL  — force kill (cannot be caught or ignored!)
# 15 SIGTERM  — graceful shutdown (default for kill)
# 18 SIGCONT  — continue stopped process
# 19 SIGSTOP  — stop process (cannot be caught or ignored!)

# Send signals
kill -15 1234        # SIGTERM to PID 1234 (polite)
kill -9 1234         # SIGKILL (forceful — last resort)
kill -HUP 1234       # reload config

# Kill by name
killall httpd        # kill all httpd processes
pkill -u apache      # kill all processes owned by apache

# Ctrl+Z then background
sleep 100 &          # run in background
jobs                 # list background jobs
fg %1                # bring job 1 to foreground
bg %1                # continue job 1 in background

# Prevent kill by parent exit
nohup long-script.sh &     # ignore SIGHUP
disown %1                   # detach job from shell`}),e.jsx("h3",{className:"subsection-title",children:"Priority and Scheduling"}),e.jsx(s,{language:"bash",title:"Nice values and CPU scheduling",code:`# nice values range from -20 (highest priority) to 19 (lowest)
# Normal users can only LOWER priority (raise nice value)
# Root can raise priority (lower nice value)

nice -n 10 ./cpu-intensive-task    # start with lower priority
renice -n 15 -p 1234              # change priority of running PID
renice -n 10 -u apache            # all processes for user

# In Ansible: run a task at lower priority
- name: Run CPU-intensive task at low priority
  command: nice -n 15 /usr/local/bin/process-data.sh

# Check current nice values
ps -o pid,ni,cmd ax | head -20

# Real-time priorities (for special use cases)
chrt -r -p 50 1234    # set real-time priority (requires root)`}),e.jsx(a,{type:"exam",title:"Exam: Process Management with Ansible",children:e.jsxs("p",{children:["The ",e.jsx("code",{children:"command"})," module runs commands without shell interpretation. The ",e.jsx("code",{children:"shell"})," module uses ",e.jsx("code",{children:"/bin/sh"})," and supports pipes, redirects, and variables. Use ",e.jsx("code",{children:"command"})," when you don't need those features — it's safer and more predictable for exam scenarios."]})})]}),r==="Filesystem Hierarchy"&&e.jsxs("div",{children:[e.jsx("h2",{className:"section-title",children:"Filesystem Hierarchy Standard (FHS)"}),e.jsx("p",{children:"The FHS defines where files go in a Linux system. Ansible tasks that manage files need to know which directories require which permissions and context."}),e.jsx("div",{className:"fhs-grid",children:[{dir:"/",desc:"Root of entire filesystem. Everything is under /. Only essential files at boot time."},{dir:"/bin → /usr/bin",desc:"Essential user command binaries: ls, cp, cat, bash. In RHEL 9, /bin is a symlink to /usr/bin."},{dir:"/sbin → /usr/sbin",desc:"System admin binaries: fdisk, mkfs, ip, firewalld. Symlinked to /usr/sbin in RHEL 9."},{dir:"/etc",desc:"Host-specific system configuration. Text files only. No binaries. This is what Ansible primarily modifies."},{dir:"/var",desc:"Variable data: logs (/var/log), spool (/var/spool), cache (/var/cache), runtime (/var/run)."},{dir:"/tmp",desc:"Temporary files. World-writable with sticky bit. Cleared on reboot (tmpfs on modern systems)."},{dir:"/home",desc:"User home directories. /home/username. Managed by Ansible's user module."},{dir:"/root",desc:"Home directory for root user. NOT under /home."},{dir:"/boot",desc:"Kernel images, initramfs, GRUB config. Do not modify unless you know what you are doing."},{dir:"/dev",desc:"Device files. Block devices (/dev/sda, /dev/nvme0n1), char devices, pseudo-devices (/dev/null, /dev/random)."},{dir:"/proc",desc:"Virtual filesystem. Kernel and process info. Nothing on disk — kernel generates it."},{dir:"/sys",desc:"Virtual filesystem. Hardware topology, kernel objects. Used by udev for device management."},{dir:"/run",desc:"Runtime data since last boot. PID files, sockets. tmpfs — cleared at boot."},{dir:"/usr",desc:"Read-only user data: /usr/bin (binaries), /usr/lib (libraries), /usr/share (data), /usr/include (headers)."},{dir:"/lib → /usr/lib",desc:"Essential shared libraries needed to boot. Symlinked in RHEL 9."},{dir:"/opt",desc:"Optional software packages. Third-party apps often install here."},{dir:"/srv",desc:"Data for services (web server files, FTP data). Often empty on RHEL."},{dir:"/mnt",desc:"Temporary mount point for sysadmin use."},{dir:"/media",desc:"Mount points for removable media (USB, CD)."}].map(t=>e.jsxs("div",{className:"fhs-item",children:[e.jsx("code",{className:"fhs-dir",children:t.dir}),e.jsx("p",{className:"fhs-desc",children:t.desc})]},t.dir))}),e.jsx("h3",{className:"subsection-title",children:"Inodes — The True File Identity"}),e.jsxs("p",{children:["An ",e.jsx("strong",{children:"inode"})," (index node) is a data structure on disk that stores all metadata about a file — except its name. The name is just an entry in a directory that points to an inode number. This explains why hard links work the way they do."]}),e.jsx("div",{className:"diagram-container",children:e.jsx("pre",{children:`
  Directory entry:         Inode #48291:              Data blocks:
  ┌────────────────┐      ┌────────────────────────┐  ┌──────────┐
  │ filename.txt   │─────►│ inode: 48291           │─►│ block 0  │
  │ inode: 48291   │      │ size: 1024 bytes        │  │ data...  │
  └────────────────┘      │ owner: UID 1000         │  └──────────┘
                          │ group: GID 1000         │  ┌──────────┐
  Another name:           │ permissions: -rw-r--r-- │─►│ block 1  │
  ┌────────────────┐      │ atime: 2024-01-15      │  │ data...  │
  │ hardlink.txt   │─────►│ mtime: 2024-01-10      │  └──────────┘
  │ inode: 48291   │      │ ctime: 2024-01-10      │
  └────────────────┘      │ links: 2               │
  ^ Same inode!           │ direct ptrs: [0, 1]    │
                          └────────────────────────┘

  Symbolic link:
  ┌────────────────┐      ┌────────────────────────┐
  │ symlink.txt    │─────►│ inode: 48300           │
  │ inode: 48300   │      │ type: symlink           │
  └────────────────┘      │ points to: /path/to/   │
                          │   filename.txt          │
                          └────────────────────────┘
  ^ Different inode! Symlink is its own file.
`})}),e.jsx(s,{language:"bash",title:"Inodes, hard links, and symlinks",code:`# View inode numbers
ls -li /etc/passwd             # -i flag shows inode
stat /etc/passwd               # full inode info

# Hard link: another name for same inode
ln /etc/hosts /tmp/hosts.bak   # hard link (same inode!)
ls -li /etc/hosts /tmp/hosts.bak  # same inode number

# Symlink: a pointer to another path
ln -s /etc/nginx/nginx.conf /tmp/nginx.conf   # symlink
ls -la /tmp/nginx.conf         # shows -> target
readlink /tmp/nginx.conf       # read the link target

# Key differences:
# Hard link: same inode, file must exist on same filesystem
# Symlink: different inode, can cross filesystems, can be dangling

# Check inode usage on a filesystem (run out = can't create files!)
df -i /

# Find files by inode (useful for damaged filesystems)
find / -inum 48291`}),e.jsx("h3",{className:"subsection-title",children:"Permissions Deep Dive"}),e.jsx(s,{language:"bash",title:"File permissions, SUID, SGID, sticky bit",code:`# Permission bits: owner | group | other
# -rwxr-xr--  1 root root  4096 Jan 10 12:00 file
#  ↑↑↑ ↑↑↑ ↑↑↑
#  │││ │││ └─── other: read only (r--)
#  │││ └──────── group: read+execute (r-x)
#  └──────────── owner: read+write+execute (rwx)

# Numeric permissions
chmod 755 script.sh    # rwxr-xr-x
chmod 644 config.conf  # rw-r--r--
chmod 600 id_rsa       # rw------- (private key!)
chmod 777 /tmp/shared  # BAD! world-writable executable

# Symbolic permissions
chmod u+x script.sh    # add execute for owner
chmod go-w file.txt    # remove write from group and other
chmod a=r file.txt     # set all to read-only

# SUID (Set User ID) - file runs as owner, not current user
chmod u+s /usr/bin/passwd   # passwd runs as root always
ls -l /usr/bin/passwd       # -rwsr-xr-x (s in owner exec)
find / -perm -4000 -type f 2>/dev/null  # find SUID files

# SGID (Set Group ID) - new files inherit directory group
chmod g+s /shared/dir        # directory SGID
ls -ld /shared/dir           # drwxrwsr-x (s in group exec)

# Sticky Bit - only owner can delete in world-writable dir
chmod +t /tmp                 # sticky bit on /tmp
ls -ld /tmp                  # drwxrwxrwt (t in other exec)

# ACLs (Access Control Lists) - beyond 9 permission bits
getfacl /etc/passwd          # view ACL
setfacl -m u:nginx:rX /var/www  # grant nginx read+execute
setfacl -m g:developers:rw- /project  # group access
setfacl -x u:nginx /var/www   # remove ACL entry
setfacl -b /var/www           # remove ALL ACLs

# Default ACLs (inherited by new files in directory)
setfacl -d -m u:nginx:rX /var/www/html`})]}),r==="Storage Internals"&&e.jsxs("div",{children:[e.jsx("h2",{className:"section-title",children:"Storage Internals"}),e.jsx("h3",{className:"subsection-title",children:"Block Devices and Partitioning"}),e.jsx("div",{className:"diagram-container",children:e.jsx("pre",{children:`
  MBR (Master Boot Record) - Legacy, max 4 primary partitions
  ┌─────────┬─────────────────────────────────────────────────┐
  │   MBR   │  Primary │  Primary │  Extended │  (unused)     │
  │ 512 bytes│  /dev/sda1│ /dev/sda2│ /dev/sda3 │              │
  │bootloader│          │          │  ┌────────┴───────────┐   │
  │+part table│         │          │  │ Logical partitions │   │
  └─────────┴─────────────────────┘  └────────────────────┘

  GPT (GUID Partition Table) - Modern, up to 128 partitions
  ┌─────────┬──────────────────────────────────────────┬─────┐
  │Protective│  Partition │  Partition │  Partition ... │ GPT │
  │   MBR   │  1 (EFI)  │  2 (boot) │  3 (data)      │Backup│
  └─────────┴──────────────────────────────────────────┴─────┘

  Device naming conventions:
  /dev/sda     - SCSI/SATA disk A
  /dev/sdb     - SCSI/SATA disk B
  /dev/nvme0n1 - NVMe drive 0, namespace 1
  /dev/vda     - Virtual disk (in VMs)
  /dev/sda1    - First partition of sda
  /dev/nvme0n1p1 - First partition of nvme0n1
`})}),e.jsx(s,{language:"bash",title:"Block device and partition management",code:`# List block devices
lsblk                           # tree view
lsblk -f                        # + filesystem type, UUID
blkid                           # UUID and type of all devices
fdisk -l                        # list all disks + partitions

# Partition tools
fdisk /dev/sdb                  # interactive (MBR style)
gdisk /dev/sdb                  # GPT version of fdisk
parted /dev/sdb print           # non-interactive display
parted /dev/sdb mklabel gpt     # create GPT partition table
parted /dev/sdb mkpart primary xfs 1MiB 100%  # create partition

# Create filesystems
mkfs.xfs /dev/sdb1              # XFS (preferred on RHEL)
mkfs.ext4 /dev/sdb1             # ext4
mkfs.xfs -f /dev/sdb1           # force overwrite existing

# Mount
mount /dev/sdb1 /mnt/data       # temporary mount
umount /mnt/data                # unmount

# Persistent mount via /etc/fstab
# /dev/sdb1  /mnt/data  xfs  defaults  0  2
# UUID=...   /mnt/data  xfs  defaults  0  2  (use UUID!)
blkid /dev/sdb1                 # get UUID
echo "UUID=abc123 /mnt/data xfs defaults 0 2" >> /etc/fstab
mount -a                        # mount everything in fstab (test!)`}),e.jsx("h3",{className:"subsection-title",children:"LVM — Logical Volume Manager Deep Dive"}),e.jsx("div",{className:"diagram-container",children:e.jsx("pre",{children:`
  LVM Architecture:

  Physical Disks:                      ┌──────┐ ┌──────┐ ┌──────┐
                                       │/dev/ │ │/dev/ │ │/dev/ │
                                       │sdb   │ │sdc   │ │sdd   │
                                       └──┬───┘ └──┬───┘ └──┬───┘
                                          │         │         │
  Physical Volumes (PV):            ┌─────▼──┐ ┌───▼────┐ ┌─▼──────┐
  pvcreate /dev/sdb                 │  PV    │ │  PV    │ │  PV    │
  pvdisplay /dev/sdb                │/dev/sdb│ │/dev/sdc│ │/dev/sdd│
                                    └─────┬──┘ └───┬────┘ └─┬──────┘
                                          │         │         │
  Volume Group (VG):                ┌─────▼─────────▼─────────▼─────┐
  vgcreate datavg /dev/sdb /dev/sdc │  Volume Group: datavg          │
  vgdisplay datavg                  │  Total PE: 750 × 4MB = 3GB     │
                                    └──────────────┬────────────────-┘
                                                   │
  Logical Volumes (LV):             ┌──────────────┼───────────────┐
  lvcreate -L 1G -n data datavg     │              │               │
  lvcreate -l 50%VG -n logs datavg  ▼              ▼               ▼
                                 ┌──────┐       ┌──────┐       ┌──────┐
                                 │  LV  │       │  LV  │       │  LV  │
                                 │ data │       │ logs │       │(free)│
                                 │ 1GB  │       │1.5GB │       │0.5GB │
                                 └──┬───┘       └──┬───┘       └──────┘
                                    │              │
  Filesystem + Mount:               ▼              ▼
                               mkfs.xfs       mkfs.ext4
                               /mnt/data      /var/log
`})}),e.jsx(s,{language:"bash",title:"Complete LVM workflow",code:`# Step 1: Create Physical Volumes
pvcreate /dev/sdb /dev/sdc    # mark disks as PVs
pvs                            # quick list
pvdisplay                      # detailed info
pvdisplay /dev/sdb             # specific PV

# Step 2: Create Volume Group
vgcreate datavg /dev/sdb /dev/sdc   # create VG
vgcreate -s 8M datavg /dev/sdb     # custom PE size (default 4M)
vgs                                 # quick list
vgdisplay datavg                    # detailed

# Step 3: Create Logical Volumes
lvcreate -L 1G -n data datavg      # fixed size: 1 gigabyte
lvcreate -L 500M -n logs datavg    # fixed size: 500 megabytes
lvcreate -l 50%VG -n backup datavg # 50% of total VG space
lvcreate -l 100%FREE -n extra datavg  # use all remaining space
lvs                                 # quick list
lvdisplay /dev/datavg/data          # detailed

# Step 4: Filesystem and mount
mkfs.xfs /dev/datavg/data
mkfs.ext4 /dev/datavg/logs
mkdir -p /mnt/data /var/log/app
mount /dev/datavg/data /mnt/data
mount /dev/datavg/logs /var/log/app

# Persist in fstab (use /dev/mapper/ path or lvdisplay path)
echo "/dev/datavg/data /mnt/data xfs defaults 0 0" >> /etc/fstab
echo "/dev/datavg/logs /var/log/app ext4 defaults 0 0" >> /etc/fstab
mount -a    # test fstab entries

# Extending LVs (online, no unmount needed for xfs!)
lvextend -L +500M /dev/datavg/data      # add 500MB
lvextend -l +50%FREE /dev/datavg/data   # add 50% of free space
xfs_growfs /mnt/data                    # grow XFS (must be mounted)
resize2fs /dev/datavg/logs              # grow ext4 (can be mounted)

# Reducing (DANGER: must unmount for ext4, xfs cannot shrink)
umount /dev/datavg/logs
e2fsck -f /dev/datavg/logs             # check first!
resize2fs /dev/datavg/logs 200M        # resize ext4 filesystem
lvreduce -L 200M /dev/datavg/logs      # reduce LV

# Adding disk to existing VG (expand the pool!)
pvcreate /dev/sdd
vgextend datavg /dev/sdd               # add PV to VG

# Remove LVM (reverse order!)
umount /mnt/data
lvremove /dev/datavg/data
vgremove datavg
pvremove /dev/sdb /dev/sdc`}),e.jsxs(a,{type:"warning",title:"XFS vs ext4: Key Differences",children:[e.jsxs("p",{children:[e.jsx("strong",{children:"XFS:"})," Default filesystem on RHEL 7+. Excellent for large files. Can be grown online (while mounted). ",e.jsx("strong",{children:"Cannot be shrunk"}),". Use ",e.jsx("code",{children:"xfs_growfs"})," to extend."]}),e.jsxs("p",{style:{marginTop:"8px"},children:[e.jsx("strong",{children:"ext4:"})," Mature, reliable. Can be grown and shrunk (offline for shrink). Use ",e.jsx("code",{children:"resize2fs"}),". Slightly slower than XFS for large sequential I/O."]}),e.jsxs("p",{style:{marginTop:"8px"},children:[e.jsx("strong",{children:"Exam rule:"}),' When the exam says "XFS", never try to shrink it. Grow only. For ext4, you can shrink but you must unmount first.']})]})]}),r==="Networking"&&e.jsxs("div",{children:[e.jsx("h2",{className:"section-title",children:"Linux Networking"}),e.jsx("h3",{className:"subsection-title",children:"Interface Naming"}),e.jsxs("p",{children:["RHEL uses ",e.jsx("strong",{children:"predictable network interface names"})," — no more eth0/eth1 that could change on reboot. The naming is based on the physical location of the device."]}),e.jsx(s,{language:"bash",title:"Network interface commands",code:`# Interface naming conventions:
# en = ethernet, wl = wireless, ww = wwan
# p = PCI slot, s = USB port, o = on-board
# ens3    = ethernet, hotplug slot 3
# enp2s0  = ethernet, PCI bus 2, slot 0
# eno1    = ethernet, on-board 1

# ip command (replaces ifconfig/route/arp)
ip addr show                    # show all interfaces and IPs
ip addr show ens3               # specific interface
ip link show                    # link layer info
ip route show                   # routing table
ip route show default           # default gateway
ip neigh show                   # ARP table

# Add/remove IP addresses
ip addr add 192.168.1.100/24 dev ens3    # add IP (temporary)
ip addr del 192.168.1.100/24 dev ens3   # remove IP
ip link set ens3 up                      # bring interface up
ip link set ens3 down                    # bring interface down

# Network statistics
ss -tuln                        # listening TCP/UDP sockets
ss -tulnp                       # + process names (root required)
ss -ta                          # all TCP connections
ss -s                           # summary statistics
netstat -tuln                   # older equivalent (net-tools)

# DNS and hostname
hostname                        # current hostname
hostnamectl set-hostname server1.example.com   # persistent
cat /etc/hostname               # stored here
nmcli general hostname          # via NetworkManager

# DNS resolution
cat /etc/resolv.conf            # DNS servers
cat /etc/nsswitch.conf          # resolution order (files,dns)
nslookup server1.example.com    # DNS lookup
dig server1.example.com         # detailed DNS info
host server1.example.com        # simple lookup

# Connectivity testing
ping -c 4 8.8.8.8               # ICMP echo
traceroute 8.8.8.8              # path tracing
curl -v http://example.com      # HTTP test`}),e.jsx("h3",{className:"subsection-title",children:"NetworkManager"}),e.jsx(s,{language:"bash",title:"NetworkManager configuration",code:`# nmcli - NetworkManager command-line tool
nmcli connection show                    # list connections
nmcli device show                        # device status
nmcli device show ens3                   # specific device
nmcli connection show "System ens3"      # connection details

# Create a connection
nmcli connection add type ethernet   con-name "myconn"   ifname ens3   ipv4.addresses 192.168.1.10/24   ipv4.gateway 192.168.1.1   ipv4.dns "8.8.8.8 8.8.4.4"   ipv4.method manual

# Modify existing connection
nmcli connection modify "System ens3"   ipv4.addresses 192.168.1.20/24   ipv4.gateway 192.168.1.1   ipv4.method manual

# Activate/deactivate
nmcli connection up "myconn"
nmcli connection down "myconn"
nmcli connection delete "myconn"

# Connection files stored in:
ls /etc/NetworkManager/system-connections/`}),e.jsx("h3",{className:"subsection-title",children:"firewalld — Zone-Based Firewall"}),e.jsx(s,{language:"bash",title:"firewalld management",code:`# firewalld concepts:
# Zones: named sets of rules (public, trusted, internal, dmz...)
# Services: named port groups (/usr/lib/firewalld/services/)
# Sources: bind zone to IP/subnet/interface

# Zone hierarchy (trust level):
# drop < block < public < external < dmz < work < home < internal < trusted

# Status and info
firewall-cmd --state                      # running?
firewall-cmd --get-active-zones           # zones in use
firewall-cmd --get-default-zone           # default zone
firewall-cmd --list-all                   # all rules in default zone
firewall-cmd --list-all --zone=public     # specific zone

# Managing services (--permanent persists after reboot)
firewall-cmd --add-service=http --permanent
firewall-cmd --add-service=https --permanent
firewall-cmd --remove-service=telnet --permanent
firewall-cmd --list-services              # current session
firewall-cmd --list-services --permanent  # permanent rules

# Managing ports
firewall-cmd --add-port=8080/tcp --permanent
firewall-cmd --add-port=53/udp --permanent
firewall-cmd --remove-port=8080/tcp --permanent

# IMPORTANT: apply permanent rules to current session
firewall-cmd --reload                     # reload permanent rules

# Rich rules (advanced)
firewall-cmd --add-rich-rule='rule family="ipv4" source address="192.168.1.0/24" service name="ssh" accept' --permanent

# Zones for specific interfaces/sources
firewall-cmd --zone=trusted --add-source=192.168.1.0/24 --permanent
firewall-cmd --zone=public --add-interface=ens3 --permanent

# Masquerade (NAT)
firewall-cmd --add-masquerade --permanent`})]}),r==="SELinux"&&e.jsxs("div",{children:[e.jsx("h2",{className:"section-title",children:"SELinux — Security-Enhanced Linux"}),e.jsxs("p",{children:["SELinux implements ",e.jsx("strong",{children:"Mandatory Access Control (MAC)"})," — as opposed to the traditional Unix ",e.jsx("strong",{children:"Discretionary Access Control (DAC)"})," (chmod/chown). With DAC, the file owner decides who can access it. With MAC, the kernel enforces policy regardless of file permissions. Even root cannot bypass SELinux policy."]}),e.jsx("div",{className:"diagram-container",children:e.jsx("pre",{children:`
  DAC vs MAC:

  DAC (Traditional Unix):          MAC (SELinux):
  ─────────────────────────        ─────────────────────────────
  User requests file access  →     Every access (read, write,
  Kernel checks:                   execute, connect...) goes
    - Is user the owner?           through SELinux policy check:
    - Is user in the group?
    - Does 'other' allow it?       Subject (process label)
  Root bypasses all checks!        wants to access
                                   Object (file/socket label)
                                   ↓
                                   Policy says: ALLOW or DENY
                                   Root follows policy too!

  Security Contexts:

  Process:  system_u:system_r:httpd_t:s0
            ──────── ──────── ─────── ───
            user     role     type    level (MLS)
                               ↑
                          The TYPE is what matters most!
                          Apache processes run as httpd_t
                          Only httpd_t can access httpd_sys_content_t

  File:     system_u:object_r:httpd_sys_content_t:s0
  Socket:   system_u:system_r:httpd_t:s0
`})}),e.jsx(s,{language:"bash",title:"SELinux commands — the exam essentials",code:`# Check SELinux status
getenforce                     # Enforcing / Permissive / Disabled
sestatus                       # detailed status
sestatus -v                    # verbose (shows context of files)

# Change mode
setenforce 0                   # Permissive (temporary, survives until reboot)
setenforce 1                   # Enforcing (temporary)

# Persistent mode: /etc/selinux/config
# SELINUX=enforcing    (default, most secure)
# SELINUX=permissive   (logs denials but doesn't block — useful for debugging)
# SELINUX=disabled     (requires reboot, avoid in RHCE exam!)

# View security contexts
ls -Z /var/www/html/            # files
ps -eZ | grep httpd             # processes
id -Z                          # your current context
netstat -Z                     # network connections (with context)

# Change file context (TEMPORARY - lost on relabel)
chcon -t httpd_sys_content_t /custom/webroot/index.html
chcon -R -t httpd_sys_content_t /custom/webroot/  # recursive

# Change file context (PERMANENT - survives relabel)
semanage fcontext -a -t httpd_sys_content_t "/custom/webroot(/.*)?"
restorecon -Rv /custom/webroot/     # apply the policy
# -R = recursive, -v = verbose

# Common mistake: moving files vs copying
# cp /tmp/index.html /var/www/html/  # inherits destination context ✓
# mv /tmp/index.html /var/www/html/  # KEEPS source context ✗
# After mv, run: restorecon -v /var/www/html/index.html

# SELinux Booleans — toggle features without changing policy
getsebool -a                          # list all booleans
getsebool httpd_can_network_connect   # check one
setsebool httpd_can_network_connect on        # temporary
setsebool -P httpd_can_network_connect on     # PERMANENT (-P flag!)
semanage boolean -l                   # list with descriptions

# Common booleans:
# httpd_can_network_connect     - Apache can make outbound connections
# httpd_use_nfs                 - Apache can serve NFS-mounted files
# samba_enable_home_dirs        - Samba can share home directories
# allow_ftpd_anon_write         - FTP anonymous writes
# ssh_sysadm_login              - Allow SSH as sysadm_r role

# Diagnosing SELinux denials
# Check audit log
cat /var/log/audit/audit.log | grep AVC | tail -20
ausearch -m AVC -ts today        # AVC denials today
ausearch -m AVC -c httpd         # denials for httpd

# Use audit2why for human-readable explanation
ausearch -m AVC -ts today | audit2why

# Use audit2allow to generate a fix
ausearch -m AVC -ts today | audit2allow -M mypolicy
semodule -i mypolicy.pp          # install the module

# Port contexts (SELinux controls which ports services can use)
semanage port -l                       # list all port contexts
semanage port -l | grep http           # httpd ports
semanage port -a -t http_port_t -p tcp 8080  # allow httpd on 8080
semanage port -d -t http_port_t -p tcp 8080  # remove

# Relabeling (after mode change from disabled)
touch /.autorelabel               # relabel on next boot
reboot                            # trigger relabeling`}),e.jsxs(a,{type:"exam",title:"SELinux Exam Patterns",children:[e.jsx("p",{children:'The most common exam SELinux task: "A web server cannot serve files from /custom/webroot. Fix it." The solution is:'}),e.jsxs("ol",{style:{marginTop:"8px"},children:[e.jsx("li",{children:e.jsx("code",{children:'semanage fcontext -a -t httpd_sys_content_t "/custom/webroot(/.*)?"'})}),e.jsx("li",{children:e.jsx("code",{children:"restorecon -Rv /custom/webroot/"})})]}),e.jsxs("p",{style:{marginTop:"8px"},children:["Always use ",e.jsx("code",{children:"semanage + restorecon"}),", not ",e.jsx("code",{children:"chcon"})," alone —",e.jsx("code",{children:"chcon"})," changes are lost when the filesystem is relabeled."]})]})]}),r==="Systemd"&&e.jsxs("div",{children:[e.jsx("h2",{className:"section-title",children:"Systemd — System and Service Manager"}),e.jsx("p",{children:"Systemd is PID 1 — the first process started by the kernel. It manages the entire system lifecycle: startup, services, timers, mounts, and shutdown. Understanding systemd unit types helps you write better Ansible playbooks."}),e.jsx("h3",{className:"subsection-title",children:"Unit Types"}),e.jsx("div",{className:"unit-grid",children:[{type:".service",desc:"System services (httpd, sshd, nginx). Most common type.",color:"var(--accent-primary)"},{type:".socket",desc:"Socket activation — service starts on first connection.",color:"var(--accent-sky)"},{type:".target",desc:"Group of units — like runlevels. multi-user.target, graphical.target.",color:"var(--success)"},{type:".mount",desc:"Mount points managed by systemd (from fstab or unit files).",color:"var(--warning)"},{type:".timer",desc:"Cron replacement — schedule tasks with systemd timers.",color:"var(--purple)"},{type:".path",desc:"Watch filesystem paths — trigger services on file changes.",color:"var(--danger)"}].map(t=>e.jsxs("div",{className:"unit-card",style:{borderLeftColor:t.color},children:[e.jsx("code",{style:{color:t.color,fontSize:"0.85rem",fontWeight:700},children:t.type}),e.jsx("p",{style:{fontSize:"0.82rem",color:"var(--text-muted)",marginTop:"4px",marginBottom:0},children:t.desc})]},t.type))}),e.jsx("h3",{className:"subsection-title",children:"Target Hierarchy (Boot Process)"}),e.jsx("div",{className:"diagram-container",children:e.jsx("pre",{children:`
  Systemd Boot Sequence:

  BIOS/UEFI → Bootloader (GRUB2) → Kernel → initramfs
       ↓
  Kernel mounts initramfs, starts systemd (PID 1)
       ↓
  default.target (symlink to graphical or multi-user.target)
       ↓
  ┌──────────────────────────────────────────────────────┐
  │ multi-user.target (equivalent to runlevel 3)         │
  │   ├── basic.target                                   │
  │   │     ├── sockets.target                          │
  │   │     ├── sysinit.target                          │
  │   │     │     ├── local-fs.target                   │
  │   │     │     ├── swap.target                       │
  │   │     │     └── systemd-udevd.service             │
  │   │     └── network.target                          │
  │   ├── sshd.service                                  │
  │   ├── httpd.service                                 │
  │   └── crond.service                                 │
  │                                                      │
  │ graphical.target (equivalent to runlevel 5)          │
  │   ├── multi-user.target (everything above)          │
  │   └── display-manager.service (gdm/lightdm)         │
  └──────────────────────────────────────────────────────┘
`})}),e.jsx(s,{language:"bash",title:"systemctl commands",code:`# Service management (the essentials)
systemctl start httpd            # start now
systemctl stop httpd             # stop now
systemctl restart httpd          # stop + start
systemctl reload httpd           # reload config (if supported)
systemctl status httpd           # status + last log lines
systemctl enable httpd           # enable at boot
systemctl disable httpd          # disable at boot
systemctl enable --now httpd     # enable + start immediately
systemctl disable --now httpd    # disable + stop immediately
systemctl is-enabled httpd       # enabled/disabled/static?
systemctl is-active httpd        # active/inactive?
systemctl is-failed httpd        # failed?

# Listing units
systemctl list-units             # active units
systemctl list-units --all       # all units (inc. inactive)
systemctl list-units --type=service  # only services
systemctl list-unit-files        # all unit files
systemctl list-dependencies httpd    # dependency tree

# Targets (runlevels)
systemctl get-default            # current default target
systemctl set-default multi-user.target   # change default
systemctl isolate emergency.target        # switch to emergency

# System control
systemctl poweroff
systemctl reboot
systemctl halt

# Unit file management
systemctl cat sshd               # view unit file content
systemctl edit httpd             # edit override (creates drop-in)
systemctl daemon-reload          # reload after editing unit files

# Masking (stronger than disable — prevents any start)
systemctl mask NetworkManager    # prevent starting (even manually)
systemctl unmask NetworkManager  # re-enable

# Journald — systemd logging
journalctl                       # all logs
journalctl -u httpd              # logs for specific service
journalctl -u httpd -f           # follow (tail -f equivalent)
journalctl -u httpd --since "1 hour ago"
journalctl -u httpd -n 50        # last 50 lines
journalctl -b                    # since last boot
journalctl -b -1                 # previous boot
journalctl -p err                # error priority and above
journalctl --disk-usage          # check log disk usage`}),e.jsx(a,{type:"exam",title:"Key Ansible → Systemd Relationship",children:e.jsxs("p",{children:["When you use the Ansible ",e.jsx("code",{children:"service"})," or ",e.jsx("code",{children:"systemd"})," module with",e.jsx("code",{children:"enabled: true"}),", Ansible runs ",e.jsx("code",{children:"systemctl enable"})," behind the scenes. The exam requires services to survive reboot, so always set",e.jsx("code",{children:"enabled: true"})," AND ",e.jsx("code",{children:"state: started"}),"."]})})]}),e.jsx("style",{children:`
        .section-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: var(--space-8);
          padding: var(--space-3);
          background: var(--bg-elevated);
          border-radius: var(--radius-lg);
          border: 1px solid var(--border-subtle);
        }

        .section-tab {
          padding: 6px 16px;
          border: 1px solid transparent;
          border-radius: var(--radius-md);
          background: transparent;
          color: var(--text-muted);
          font-size: 0.83rem;
          font-weight: 500;
          cursor: pointer;
          transition: all var(--transition-fast);
          font-family: var(--font-body);
        }

        .section-tab:hover {
          background: var(--accent-primary-subtle);
          color: var(--text-primary);
          border-color: var(--border-accent);
        }

        .section-tab.active {
          background: var(--accent-primary-subtle);
          color: var(--accent-primary);
          border-color: var(--border-accent);
          font-weight: 600;
        }

        .fhs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: var(--space-3);
          margin: var(--space-5) 0;
        }

        .fhs-item {
          background: var(--bg-elevated);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: var(--space-3) var(--space-4);
        }

        .fhs-dir {
          display: block;
          font-size: 0.82rem;
          color: var(--accent-sky);
          font-weight: 600;
          margin-bottom: 4px;
        }

        .fhs-desc {
          font-size: 0.78rem;
          color: var(--text-muted);
          line-height: 1.5;
          margin: 0;
        }

        .unit-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: var(--space-3);
          margin: var(--space-4) 0;
        }

        .unit-card {
          background: var(--bg-elevated);
          border: 1px solid var(--border-subtle);
          border-left: 3px solid;
          border-radius: var(--radius-md);
          padding: var(--space-3) var(--space-4);
        }
      `})]})}export{p as default};
