---
layout: post
title: How to improve your account security
date: 2022-06-03 01:17 +0200
last_modified_at:
description: If you already have one or multiple AWS accounts and you want to improve your security approach you should read this article.
category:
- Security
tags:
- security
- getting started
published: true
pin: false
featured_post: false
comments: false
sitemap: true
---

## TLDR

You already have one or multiple AWS accounts and you want to improve your security approach, the Well-Architected Framework (security pillar) contains a lot of information [as my previous post](/posts/getting-started-with-aws-security/){:target="_blank"}, and maybe you don't know where to start.

I will share with you two resources to do it:

- **AWS Security Maturity Model** will allow you to know the recommended actions to strengthen your security posture at every stage of your journey to the cloud
  - Contains 4 phases. The first one "quick wins" allow you fast security improvements
- Article in blog security: The top 10 most important cloud security tips that Stephen Schmidt, Chief Information Security Officer for AWS, laid out at AWS re:Invent 2019

## AWS Security Maturity Model

It is a valuable resource for reviewing the current status and improving the security of your solutions.

> The classification of the different recommendations into the categories depends on the cost and difficulty of implementing the security control, and the positive impact that it will achieve.
{: .prompt-info }

This model is **updated monthly** by AWS. The official documentation is located [here](https://maturitymodel.security.aws.dev/en/){:target="_blank"}.

### Introduction

#### Security Frameworks

Multiple frameworks help you design the construction of a plan to provide security to your loads in the cloud.

- [Well Architected Framework](https://aws.amazon.com/architecture/well-architected/){:target="_blank"}
- [NIST CyberSecurity Framework](https://aws.amazon.com/compliance/nist/){:target="_blank"}
- [Center for Internet Security (CIS) AWS Foundations](https://d1.awsstatic.com/whitepapers/compliance/AWS_CIS_Foundations_Benchmark.pdf){:target="_blank"}
- [Cloud Adoption Framework](https://aws.amazon.com/professional-services/CAF/){:target="_blank"}

#### How to prioritize

"With so many services, security controls, and recommendations… How do I prioritize? Where do I start?"

> All Quick Win recommendations can be implemented in less than a week.
{: .prompt-info }

![quick-wins](/assets/img/posts/2022-06-01-how-to-improve-your-account-security/quick-wins.png){:class="border"}

#### Evolutive path

![evolution-path](/assets/img/posts/2022-06-01-how-to-improve-your-account-security/evolution-path.png){:class="border"}

### Phase 1. Quick Wins

Quick Wins are the first thing to focus on, controls that you could implement in an organization within a maximum of one or two weeks, and will significantly improve your security standpoint.

| Level  | Recommendation |
|---|---|
| Organizational  | - Assign Security Contacts <br>- Select the region(s)  |
| Identity and Access   | - Multi-Factor Authentication <br>- Avoid using Root and audit it <br>- Access and role analysis with <kbd>IAM Access Analyzer</kbd>  |
| Protection and prevention   | - Limit Security Groups <br>- <kbd>AWS WAF</kbd> with managed rules <br>- Amazon S3 Block Public Access  |
| Detection   | - Thread Detection with <kbd>Amazon GuardDuty</kbd> and review your findings <br>- Audit API calls with <kbd>AWS CloudTrail</kbd> <br>- Analyze data security posture with <kbd>Amazon Macie</kbd> <br>- Remediate security findings found by <kbd>AWS Trusted Advisor</kbd> <br>- Automate alignment with best practices using <kbd>AWS Security Hub</kbd> <br>- Billing alarms for anomaly detection  |
| Response   | - Act on <kbd>Amazon GuardDuty</kbd> findings  |
| Recovery   |   |

[Link](https://maturitymodel.security.aws.dev/en/1.-quickwins/){:target="_blank"} to the updated content and more information on each recommendation

### Phase 2. Foundational

The controls and recommendations may take some more effort to implement but are very important.

| Level  | Recommendation |
|---|---|
| Organizational  | - Identify security and regulatory requirements <br>- Identify the most sensitive data (crown jewels) <br>- Cloud Security Training Plan <br>- Involve security teams in development |
| Identity and Access   | - Centralized user repository <br>-- Organization Policies (<kbd>SCPs</kbd>) |
| Protection and prevention   | - Manage your instances with <kbd>Fleet Manager</kbd> <br>- Data Encryption (<kbd>AWS KMS</kbd>) <br>- No secrets in your code <kbd>AWS Secrets Manager</kbd> <br>- Network segmentation (Public/Private Networks - VPCs) <br>- Multi-account management with <kbd>AWS Control Tower</kbd> |
| Detection   | - Configuration monitoring with <kbd>AWS Config</kbd> - Manage vulnerabilities in your infrastructure and perform pentesting <br>- Manage vulnerabilities in your applications <br>- Discover sensitive data with <kbd>Amazon Macie</kbd> |
| Response   | - Define Incident response playbooks <br>- Investigate ALL <kbd>Amazon GuardDuty</kbd> findings including S3 Protection |
| Recovery   | - Backups <br>- Redundancy using multiple Availability Zones  |

[Link](https://maturitymodel.security.aws.dev/en/2.-foundational/){:target="_blank"} to the updated content and more information on each recommendation

### Phase 3. Efficient

There are some controls and recommendations that allow us to manage security in an efficient way.

| Level  | Recommendation |
|---|---|
| Organizational  | - Security Champions in Development <br>- Perform thread modelling |
| Identity and Access   | - Privilege review (Least Privilege) <br>- Tagging strategy <br>- Customer IAM: security of your customers  |
| Protection and prevention   | - Image Generation Pipeline <br>- <kbd>Shield Advanced</kbd> Advanced DDoS Mitigation <br>- Anti-Malware/EDR <br>- Encryption in transit <br>- <kbd>WAF</kbd> with custom rules <br>- Outbound Traffic Control <br>- Create your reports for compliance (such as PCI-DSS) |
| Detection   | - Use abstract services (Serverless) <br>- Integration with SIEM/SOAR <br>- Network Flows analysis (<kbd>VPC Flow Logs</kbd>) |
| Response   | - Automate critical and most frequently run Playbooks <br>- Automate deviation correction in configurations |
| Recovery   | Using infrastructure as Code (<kbd>CloudFormation, CDK</kbd>)  |

[Link](https://maturitymodel.security.aws.dev/en/1.-quickwins/){:target="_blank"} to the updated content and more information on each recommendation

### Phase 4. Optimized

And finally, there are those controls and recommendations that allow you to optimize in a **continuous improvement cycle** the security posture every day. It will be characterized by security controls that are often seen in more mature organizations, in terms of security, or large organizations with very demanding requirements.

| Level  | Recommendation |
|---|---|
| Organizational  | - Forming a Red Team (Attacker's Point of View) <br>- Forming a Blue Team (Incident Response) <br>- Forming a Chaos Engineering team (Resilience) <br>- Sharing Security work and responsibility  |
| Identity and Access   | - Context-based access control <br>- IAM Policy Generation Pipeline  |
| Protection and prevention   | - Process standardization with Service Catalog <br>- DevSecOps |
| Detection   | - Simulate Failures (Chaos Monkey) <br>- <kbd>Amazon Fraud Detector</kbd> <br>- Integration with additional Intelligence Feeds  |
| Response   | - Automate most playbooks <br>- <kbd>Amazon Detective</kbd>: Root cause analysis |
| Recovery   | - Multi-region disaster recovery automation |

[Link](https://maturitymodel.security.aws.dev/en/1.-quickwins/){:target="_blank"} to the updated content and more information on each recommendation

### Complete Maturity Level

This is the complete maturity model with all the phases through all the epics.

> I recommend you access to the [original page](https://maturitymodel.security.aws.dev/en/model/){:target="_blank"} to view the linkable table in the original site.
{: .prompt-tip }

![complete-maturity-level](/assets/img/posts/2022-06-01-how-to-improve-your-account-security/complete-maturity-level.png)

## Top 10 recommendations

> These are the top 10 most important cloud security tips that Stephen Schmidt, Chief Information Security Officer for AWS, laid out at AWS re:Invent 2019.
{: .prompt-info }

The original article was written in the AWS blog [here](https://aws.amazon.com/blogs/security/top-10-security-items-to-improve-in-your-aws-account/?trk=c750fe34-f44f-43e1-bcc0-6219228839b9&sc_channel=el){:target="_blank"}.

1. **Configure account contacts**
2. **Use multi-factor authentication (MFA)**
   - is the best way to protect accounts from inappropriate access
3. **No hard-coding secrets**
   - use [AWS Secrets Manager](https://aws.amazon.com/secrets-manager/){:target="_blank"}
   - if you are using java or python you can use [CodeGuru Reviewer](https://aws.amazon.com/about-aws/whats-new/2021/11/amazon-codeguru-reviewer-hardcoded-secrets-java-python/){:target="_blank"} to detect secrets in the code
4. **Limit security groups**
   - use [AWS Config](https://aws.amazon.com/config/){:target="_blank"} and [AWS Firewall Manager](https://aws.amazon.com/firewall-manager/){:target="_blank"} to programmatically ensure that the virtual private cloud (VPC) security group configuration is what you intended
5. **Intentional data policies**
   - design your approach to data classification
6. **Centralize CloudTrail logs**
   - [AWS recommends](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-receive-logs-from-multiple-accounts.html){:target="_blank"} that you write logs in an AWS account designated for logging (Log Archive).
   - The permissions on the bucket should prevent deletion of the logs, and they should also be encrypted at rest. Review [how to use AWS to visualize AWS CloudTrail logs](https://docs.aws.amazon.com/athena/latest/ug/cloudtrail-logs.html){:target="_blank"}
7. **Validate IAM roles**
   - Use AWS IAM Access Analyzer
8. **Take action on findings**
   - Turn on [AWS Security Hub](https://docs.aws.amazon.com/securityhub/latest/userguide/what-is-securityhub.html){:target="_blank"}, [Amazon GuardDuty](https://aws.amazon.com/guardduty/){:target="_blank"}, and [AWS Identity and Access Management Access Analyzer](https://aws.amazon.com/iam/features/analyze-access/){:target="_blank"}.
   - You also need to take action when you see findings
9. **Rotate keys**
10. **Be involved in the dev cycle**
    - “raise the security culture of your organization.”

## Comment this post

> I have temporarily added the comments section to the post here. In the future, I will add it in a better way and include all the validated comments (I guess that I will have to make a filter to avoid spam)
{: .prompt-info }

{% include comment-form.html %}
{% include comment-form.js %}
{% include forms.css %}