# 📚 Salesforce Certified Slack Administrator - Complete Study Guide

> **Perfect for beginners with no prior Slack Admin experience!**
> This cheat sheet covers everything you need to pass the Slack Administrator certification.

---

## 📖 Table of Contents

1. [Exam Overview](#exam-overview)
2. [Workspace Management](#workspace-management)
3. [User Management & Provisioning](#user-management--provisioning)
4. [Security & Compliance](#security--compliance)
5. [Channels & Workflows](#channels--workflows)
6. [Apps & Integrations](#apps--integrations)
7. [Enterprise Grid (Multi-Workspace)](#enterprise-grid-multi-workspace)
8. [Analytics & Reporting](#analytics--reporting)
9. [Best Practices](#best-practices)
10. [Quick Reference Tables](#quick-reference-tables)

---

## Exam Overview

### Exam Details
- **Questions**: 60 multiple choice/multiple select
- **Time**: 105 minutes
- **Passing Score**: 67%
- **Cost**: $200 USD
- **Retake**: $100 USD (if needed)
- **Delivery**: Online proctored

### Exam Weights
| Domain | Weight |
|--------|--------|
| Workspace Administration | 35% |
| Security & Compliance | 23% |
| User & Channel Management | 18% |
| Apps & Integrations | 13% |
| Analytics & Governance | 11% |

---

## Workspace Management

### Workspace Plans
Understand the differences between Slack plans:

| Feature | Free | Pro | Business+ | Enterprise Grid |
|---------|------|-----|-----------|-----------------|
| Message History | 90 days | Unlimited | Unlimited | Unlimited |
| Apps & Integrations | 10 | Unlimited | Unlimited | Unlimited |
| Guest Access | Limited | Multi-channel | Multi-channel | Full |
| SAML SSO | ❌ | ❌ | ✅ | ✅ |
| User Provisioning (SCIM) | ❌ | ❌ | ✅ | ✅ |
| Data Export | ❌ | Standard | All messages | All + DLP |
| Workspace Limit | 1 | 1 | 1 | Unlimited |
| Support | Standard | Standard | Priority | Dedicated |

### Key Workspace Settings

**Workspace Name & Icon**
- Set descriptive workspace name
- Upload branded icon (512x512px recommended)
- Define workspace URL (cannot be changed later!)

**Default Channels**
- `#general` - Auto-join for all members (cannot be archived)
- `#random` - Optional auto-join
- Can configure up to 5 default channels

**Retention Policies**
- Message retention: Keep forever, custom timeframe, or specific time
- File retention: Separate from message retention
- **Important**: Retention is destructive and cannot be undone

---

## User Management & Provisioning

### User Roles & Permissions

| Role | Capabilities |
|------|--------------|
| **Workspace Owner** | Full admin access, billing, workspace deletion, owner management |
| **Workspace Admin** | Manage members, settings, apps, channels (cannot delete workspace) |
| **Workspace Member** | Standard user - can create channels, send DMs, use apps |
| **Guest (Multi-channel)** | Access specific channels only (Business+ or higher) |
| **Single-channel Guest** | Access one channel only |

### User Provisioning Methods

#### 1. **Manual Invites**
- Individual email invites
- Bulk CSV upload
- ⚠️ Not scalable for large organizations

#### 2. **Email Domain Approval**
- Allow auto-join for verified email domains
- Example: Anyone with `@company.com` can join
- ⚠️ Security risk - requires domain verification

#### 3. **SAML-based SSO** (Business+ / Enterprise Grid)
- Single Sign-On with identity provider (IdP)
- Examples: Okta, Azure AD, OneLogin
- **Just-In-Time (JIT) Provisioning**: Creates user on first login
- **Best Practice**: Use with SCIM for full automation

#### 4. **SCIM API** (Business+ / Enterprise Grid) ⭐ RECOMMENDED
- **System for Cross-domain Identity Management**
- Automatic user creation, updates, and deactivation
- Syncs user attributes (department, title, manager)
- **Most secure** for large organizations
- Requires SAML SSO to be enabled first

### Deactivating vs. Deleting Users

| Action | Effect | When to Use |
|--------|--------|-------------|
| **Deactivate** | User cannot access workspace, data retained | Employee leaves temporarily |
| **Delete** | Removes user + all messages | GDPR/data privacy requests |

---

## Security & Compliance

### Authentication & Access

#### SAML SSO Configuration
1. Configure IdP (Identity Provider)
2. Upload IdP metadata to Slack
3. Configure assertion attributes
4. Test with a pilot group
5. Enforce SSO for all users

**Key SAML Attributes:**
- `email` (required)
- `first_name`, `last_name`
- `title`, `department` (for profile sync)

#### Two-Factor Authentication (2FA)
- **Recommended**: Require 2FA for all members
- **Enforce at workspace level** (Business+ / Enterprise Grid)
- Methods: SMS, authenticator app (TOTP), hardware keys

### Session & Device Management

**Session Duration**
- Configure how long users stay signed in
- Options: 1 day, 7 days, 30 days, or custom
- **Mobile session timeout**: Can be different from desktop

**App Management**
- Control which apps can be installed
- Pre-approve apps for users
- **App approval workflow**: Route requests to admins

### Data Loss Prevention (DLP)

**Export Controls**
- Restrict who can export workspace data
- Disable exports for compliance (HIPAA, GDPR)

**Message Deletion**
- Control who can delete messages
- **Admins only**: Prevents evidence tampering
- **All members**: Default, allows self-correction

**File Sharing**
- Restrict external file sharing
- Require links instead of file uploads
- **External links**: Can be disabled for compliance

### Compliance Features

| Feature | Description | Plan Required |
|---------|-------------|---------------|
| **Data Residency** | Choose where data is stored (US, EU, etc.) | Enterprise Grid |
| **eDiscovery API** | Legal holds & discovery | Enterprise Grid |
| **Audit Logs** | Track all admin actions | Business+ / Enterprise Grid |
| **DLP Integrations** | Connect to DLP tools (e.g., Nightfall) | Business+ / Enterprise Grid |
| **Corporate Export** | Export all messages for compliance | Business+ / Enterprise Grid |

---

## Channels & Workflows

### Channel Types

| Type | Visibility | Use Case |
|------|------------|----------|
| **Public** | Anyone can join | General topics, company-wide |
| **Private** | Invite-only | Confidential projects, HR |
| **Shared (External)** | Between workspaces | Partner collaboration |
| **Org-wide** | All workspaces in Grid | Enterprise announcements |

### Channel Naming Conventions

**Best Practices:**
- Use prefixes: `#proj-`, `#team-`, `#help-`
- Examples:
  - `#proj-website-redesign`
  - `#team-engineering`
  - `#help-it-support`
- **Enforce naming policies** (Enterprise Grid)

### Channel Management

**Archiving Channels**
- Preserves message history
- Searchable after archiving
- Can be unarchived later
- **Cannot archive #general**

**Channel Posting Permissions**
- **All members**: Default
- **Admins only**: For announcements
- **Specific members**: Curated content channels

**External Sharing (Slack Connect)**
- Share channels with external organizations
- Requires approval from both sides
- **Security**: Can restrict to verified domains

---

## Apps & Integrations

### App Management Workflow

1. **App Discovery**: Browse Slack App Directory
2. **Request**: User requests app installation
3. **Admin Review**: Admin approves/denies
4. **Installation**: App is added to workspace
5. **Configuration**: Set permissions and scopes

### App Permission Scopes

**Common Scopes:**
| Scope | Access |
|-------|--------|
| `channels:read` | View public channels |
| `channels:write` | Create/archive channels |
| `chat:write` | Post messages |
| `users:read` | View user profiles |
| `admin.conversations:read` | Admin access to conversations |
| `files:read` | Access uploaded files |

**Security Tip**: Only grant minimum required scopes!

### Workflow Builder

**What is it?**
- No-code automation tool
- Triggered by events (message, emoji, schedule)
- Actions: Send message, create channel, form, external webhook

**Example Workflows:**
- New hire onboarding
- Daily standup reminders
- Incident response automation
- PTO request approval

**Workflow Management:**
- Admins can view all workflows
- Can disable/enable workflows
- Monitor usage and errors

### Popular Integrations

| App | Purpose |
|-----|---------|
| **Google Calendar** | Meeting reminders, schedule |
| **Salesforce** | CRM notifications, record updates |
| **Jira** | Issue tracking, sprint updates |
| **GitHub** | Code review, PR notifications |
| **Zoom** | Start meetings from Slack |
| **PagerDuty** | Incident alerts |

---

## Enterprise Grid (Multi-Workspace)

### Grid Hierarchy

```
Organization (Grid)
├── Workspace 1
│   ├── Channels
│   └── Users
├── Workspace 2
│   ├── Channels
│   └── Users
└── Workspace 3
    ├── Channels
    └── Users
```

### Org-Level vs. Workspace-Level Settings

| Setting | Org-Level | Workspace-Level |
|---------|-----------|-----------------|
| **SAML SSO** | ✅ Enforced | Inherits |
| **User Provisioning** | ✅ SCIM | Local invites |
| **Data Retention** | ✅ Policy | Can be stricter |
| **App Approvals** | ✅ Org-wide | Local apps |
| **Audit Logs** | ✅ All activity | Workspace only |

### Discovery Features (Enterprise Grid)

**Org-wide Channels**
- Visible across all workspaces
- Used for company-wide announcements
- Examples: `#org-announcements`, `#org-social`

**Channel Browsing**
- Users can browse public channels across workspaces
- Request to join channels in other workspaces

**User Directory**
- Search for people across entire organization
- View profiles from any workspace

### Identity Provider (IdP) Mapping

- Map IdP groups to Slack user groups
- Automatic group membership based on AD/LDAP
- Example: AD group "Engineering" → Slack group "@engineers"

---

## Analytics & Reporting

### Workspace Analytics (Business+ / Enterprise Grid)

**Key Metrics:**
- **Active Users**: Daily, weekly, monthly
- **Messages Sent**: Total and per user
- **App Usage**: Which apps are most used
- **Channel Activity**: Most/least active channels
- **File Sharing**: Upload trends

**Access:**
- Admin Dashboard → Analytics
- Export CSV for deeper analysis

### Audit Logs

**What's Logged:**
- User invites/deactivations
- Channel creation/archival
- App installations/removals
- Permission changes
- Export events
- SSO logins

**Retention:**
- Business+: 90 days
- Enterprise Grid: Unlimited (configurable)

**Use Cases:**
- Security investigations
- Compliance audits
- Troubleshooting access issues

---

## Best Practices

### 🛡️ Security Best Practices

1. **Enable SAML SSO + SCIM** for automated user lifecycle
2. **Enforce 2FA** for all users
3. **Restrict app installations** to admin-approved only
4. **Regular audit log reviews** (monthly)
5. **Set message retention policies** per compliance needs
6. **Disable public file sharing** if not needed
7. **Use Private channels** for sensitive topics

### 👥 User Management Best Practices

1. **Offboard immediately**: Deactivate users on last day
2. **Guest access**: Use multi-channel guests for external partners
3. **User groups**: Create groups like @hr, @engineering for mentions
4. **Profile completeness**: Encourage users to fill out profiles

### 📣 Communication Best Practices

1. **Default channels**: Keep #general for important updates only
2. **Channel guidelines**: Post purpose and rules in channel description
3. **Naming conventions**: Enforce consistent channel naming
4. **Archive inactive channels**: After 90 days of no activity

### 🤖 App & Integration Best Practices

1. **App review process**: Test apps in sandbox first
2. **Minimize permissions**: Only grant necessary scopes
3. **Monitor app usage**: Remove unused apps
4. **Workflow documentation**: Document automation workflows

---

## Quick Reference Tables

### Common Admin Tasks

| Task | Where to Find It |
|------|------------------|
| Invite users | Workspace Settings → People |
| Deactivate user | Workspace Settings → People → (User) → Deactivate |
| Configure SSO | Workspace Settings → Authentication |
| Install app | App Directory → Request/Install |
| View audit logs | Admin Dashboard → Logs |
| Export data | Workspace Settings → Import/Export |
| Create user group | People & user groups → User groups |
| Set retention | Workspace Settings → Retention & Exports |

### Keyboard Shortcuts (Useful for Admins)

| Shortcut | Action |
|----------|--------|
| `Cmd/Ctrl + K` | Quick switcher (jump to channel) |
| `Cmd/Ctrl + /` | Show all shortcuts |
| `Cmd/Ctrl + Shift + A` | All unreads |
| `Cmd/Ctrl + Shift + K` | Direct messages |

### API Endpoints (For Automation)

| Endpoint | Purpose |
|----------|---------|
| `users.list` | Get all workspace users |
| `conversations.list` | Get all channels |
| `conversations.create` | Create a channel |
| `admin.users.invite` | Invite user (Grid) |
| `admin.apps.approve` | Approve app request |

---

## 🎯 Exam Tips

### What to Focus On

1. **User Provisioning**: SCIM vs. SSO vs. email invites
2. **Security**: SAML, 2FA, session management
3. **Compliance**: Data retention, exports, DLP
4. **Enterprise Grid**: Org-level vs. workspace-level settings
5. **Apps**: Permission scopes, approval workflows
6. **Channels**: Types, permissions, external sharing

### Common Traps

❌ **Wrong**: "Email domain approval is the most secure way to onboard users"
✅ **Right**: "SAML SSO + SCIM is the most secure for large organizations"

❌ **Wrong**: "Deleting a user removes them but keeps their messages"
✅ **Right**: "Deactivating keeps messages; deleting removes everything"

❌ **Wrong**: "Free plan includes SAML SSO"
✅ **Right**: "SAML SSO requires Business+ or Enterprise Grid"

### Scenario-Based Questions

**Example 1:**
> "A 4,000-person company wants to restrict Slack to company emails only. What's the best approach?"

**Answer**: Configure SAML SSO with SCIM provisioning. This automatically provisions users from your IdP and deactivates them when they leave.

**Example 2:**
> "HR needs a private channel for confidential discussions. How should you set this up?"

**Answer**: Create a private channel, invite only HR members, and consider disabling message export for that channel.

---

## 📝 Study Strategy

### Week 1: Foundation
- [ ] Read official Slack Admin guide
- [ ] Understand workspace roles and permissions
- [ ] Practice creating/managing channels
- [ ] Learn user provisioning methods

### Week 2: Security & Compliance
- [ ] Study SAML SSO configuration
- [ ] Understand SCIM provisioning
- [ ] Learn about retention policies
- [ ] Review audit logs and exports

### Week 3: Advanced Features
- [ ] Enterprise Grid concepts
- [ ] App management and scopes
- [ ] Workflow Builder
- [ ] Analytics and reporting

### Week 4: Practice
- [ ] Take practice quizzes
- [ ] Review weak areas
- [ ] Hands-on lab (if possible)
- [ ] Memorize quick reference tables

---

## 🔗 Additional Resources

### Official Slack Resources
- [Slack Admin Guide](https://slack.com/help/categories/360000049043-Slack-administration)
- [Slack API Documentation](https://api.slack.com/)
- [Enterprise Grid Admin Guide](https://slack.com/help/categories/360000049063-Enterprise-Grid)

### Practice
- Use the CertQuiz app (you're here! 🎉)
- Create a free Slack workspace to practice
- Slack Admin certification practice exams

### Community
- [Slack Community Forums](https://slackcommunity.com/)
- [r/Slack on Reddit](https://reddit.com/r/slack)

---

## ✅ Pre-Exam Checklist

Before taking the exam, make sure you can answer these:

- [ ] What's the difference between SAML and SCIM?
- [ ] Which plan is required for SSO? (Business+ or Enterprise Grid)
- [ ] What are the 5 user roles in Slack?
- [ ] How do you enforce 2FA for all users?
- [ ] What's the difference between public and private channels?
- [ ] What's an org-wide channel? (Enterprise Grid)
- [ ] How do audit logs help with compliance?
- [ ] What are common app permission scopes?
- [ ] How do you set up external channel sharing?
- [ ] What's the best way to onboard 1,000+ users securely?

---

## 🎓 Good Luck!

You're now ready to take the Slack Administrator certification! 

**Remember:**
- Read each question carefully
- Eliminate obviously wrong answers first
- For scenario questions, think about **best practices** and **scalability**
- SCIM + SAML is almost always the right answer for large-scale user management
- When in doubt, choose the most secure option

**Now go practice with the quiz app!** 🚀

---

*Last Updated: August 2026*
*This guide covers the Salesforce Certified Slack Administrator exam objectives.*
