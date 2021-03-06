---
layout: post
title: The technology behind this blog
date: 2022-03-02 21:49 +0100
last_modified_at:
description: I just started the blog, but before that I did a lot of research comparing technologies, doing proofs of concept, and it took me weeks to figure out how to do it until I felt comfortable with the solution. Want to know more?
category: General
tags:
- amplify
- cdk
- github
- serverless
published: true
pin: true
featured_post: true
comments: false
sitemap: true
mermaid: true
---
---

## TLDR

My technology approach is:

- Use of **AWS resources** when possible. One of the reasons for creating this blog is to practice with AWS... and as a first step, the blog itself must use AWS resources. However, as a good rule, there is an exception
  > <kbd>GitHub</kbd> is used as **code repository** because I want to share my code easily in a public way
  {: .prompt-danger }
- Serverless architecture
- Apply the separation of concerns design principle to frontend and backend:
  - **Frontend**: Static website generated with Jekyll and deployed with AWS Amplify
    - Code [here](https://github.com/alazaroc/blog-web/){:target="_blank"}
  - **Backend**: AWS resources deployed with CDK using the TypeScript language
    - Code [here](https://github.com/alazaroc/blog-infrastructure/){:target="_blank"}

## Frontend

I have included the following in this section:

- Decision 1: Technology to create the blog
- Decision 2: Technology to deploy the blog
- Demo: How to deploy it

I could add much more details but I want to keep it short.

### Technology to create the blog

First of all, I needed to choose how to create the blog, and nowadays there are a lot of options to do it in a serverless way:

- Single Page Application (SPA): React, Angular, Vue.js, Ionic, Ember
- Server-Side Rendering (SSR): Express.js, Next.js, Nux.js, Gatsby.js
- Static Site Generator (SSG): Gatsby, Next.js, Nuxt.js, Hugo, Jekyll, Hexo
- Progressive Web Apps (PWA): React, Angular, Vue.js, Preact, PWABuilder

Since I wanted to **keep it simple**, I used a **static site generator.** I must admit I hesitated with Hugo, Jekyll, and Hexo, all three options were good for me and although I liked Hugo for its fast build times and execution performance, I finally decided on <kbd>Jekyl</kbd> just because the theme I used ([Chirpy](https://github.com/cotes2020/jekyll-theme-chirpy/){:target="_blank"}) I liked more visually than the other options and I didn't want to have to customize it too much.

> I am a big fan of the KISS design principle!
{: .prompt-info }

### Technology to deploy the blog

After choosing Jekyll as my static site generator, I needed to know how to deploy it on AWS and, of course, there are many options to do it on AWS:

- EC2 + RDS (i.e. traditional blog with WordPress / Ghost + Gatsby / ...)
- LightSail (by the way, [an interesting article comparing LightSail with EC2](https://aws.amazon.com/premiumsupport/knowledge-center/lightsail-differences-from-ec2/){:target="_blank"})
- Container solutions (ECS/EKS)
- AWS ElasticBeanstalk
- S3
- AWS Amplify

But like I want it serverless and simple, I've leveraged <kbd>AWS Amplify</kbd> to help me with this point.

> What is AWS Amplify? (Explained by AWS)
>
> *[AWS Amplify](https://aws.amazon.com/amplify/){:target="_blank"} is a set of purpose-built tools and features that enables frontend web and mobile developers to quickly and easily build full-stack applications on AWS.*
>
> *Amplify provides two services: Amplify Hosting and Amplify Studio.*
>
> - ***Amplify Hosting** provides a git-based workflow for hosting full-stack serverless web apps with continuous deployment.*
> - ***Amplify Studio** is a visual development environment that simplifies the creation of scalable, full-stack web and mobile apps. Use Studio to build your frontend UI with a set of ready-to-use UI components, create an app backend, and then connect the two together.*

> AWS Amplify is the fastest and easiest way to develop and deploy reliable and scalable mobile/web applications on AWS
{: .prompt-tip }

I used **Amplify Hosting** for the following reasons (there are more, but the following are important to me):

- Serverless (uses S3 and CloudFront behind the scenes)
- Integrates with my existing code in GitHub
- Supports Jekyll (my static site generator)
- Manage the CI/CD of my application
- Easy way to connect my application with my custom domain
- Instant cache invalidations in new versions
- Integrated with Amazon CloudWatch

As you can see, this solution is awesome if you want that AWS manage for you the CI/CD, web, cache, certificate of your domain...

> However, this is too "automagic" for me and I am here to practice/play and show you the results... so **in the future I'd like to migrate Amplify to a custom solution** to have more control and more services to play with (S3, CloudFront, AWS Certificate Manager, Developer Tools)... a lot of fun is waiting for me!
{: .prompt-danger }

### How to deploy it

I wrote it in this post: [How to deploy a web with amplify hosting](/posts/how-to-deploy-a-web-with-amplify-hosting/){:target="_blank"}

And I complemented it with this one: [How to add CI/CD to my CDK project](/posts/how-to-add-ci-cd-to-my-cdk-project/){:target="_blank"}

## Backend

I have included the following in this section:

- Decision 1: What resources to create
- Decision 2: Technology to deploy infrastructure
- Demo: How to deploy infrastructure

### What resources to create

No backend is necessary for the blog to work. Simple blogs that only have content don't need anything more than static pages. However, if you want more functionality like forms, mail subscriptions, or comments you will need to use external plugins (to store the data somewhere else, not on AWS) or create your own solutions.

I don't want to use external plugins if I can do it "just the same" myself in AWS and practice/play with new services in the process

After creating my empty blog I thought that it would be a good idea to implement the following:

- Forms (contact form)
- Mail Subscription (to send updates of the blog)
- Add comments to each post (register it and show it)

Now, I have a basic implementation of these points but I will improve it in the future.

This is the architecture diagram of the AWS resources created:

![architecture_diagram](/assets/img/posts/2022-03-01-the-technology-behind-this-blog/backend-architecture-400x353.png)
*Backend Architecture Diagram*

> The backend can also be integrated with the frontend with `Amplify Studio`, but I am not interested in doing it that way. I want separation of concerns and manage both independently.
{: .prompt-info }

#### Forms

- Used here: [Contact form](/about/#contact){:target="_blank"}
- External option easy to integrate: ~~Google Forms~~.
- Custom AWS solution:

  ``` mermaid
    flowchart LR
    A(Contact form) --> B(API Gateway)
    B --> C(Lambda)
    C --> D(SES)
    D --> E(My email)  
  ```

#### Mail Subscription

- Used here: [Mail subscription](/about/#the-blog){:target="_blank"}
- External option easy to integrate: ~~Mailchimp~~
- Custom AWS solution:

  ``` mermaid
    flowchart LR
    A(Mail subscription form) --> B(API Gateway)
    B --> C(Lambda)
    C --> D(DynamoDB)
  ```

> At this moment, I only store the subscription information and if I want to send emails I have to do it manually. However, in the future, I will automate it and I will add the option to unsubscribe (to the sent mail)
{: .prompt-warning }

#### Comments

- Used here: [Comment](#comment-this-post){:target="_blank"}
- External option easy to integrate: ~~Disqus~~
- Custom AWS solution

  ``` mermaid
    flowchart LR
    A(Mail subscription form) --> B(API Gateway)
    B --> C(Lambda)
    C --> D(DynamoDB)
  ```

> At this moment I only store the comments of each post in a DynamoDB table and in the future I will show all validated comments in the posts
{: .prompt-warning }

### Technology to deploy infrastructure

Honestly, I did not evaluate other options, since I knew which one to choose.

I use <kbd>CDK</kbd> (Cloud Development Kit) with TypeScript programming language to create the backend services.

> What is CDK? (Explained by AWS)
>
> *[CDK](https://aws.amazon.com/cdk/){:target="_blank"} is an open-source software development framework to define your cloud application resources using familiar programming languages.*
>
> *AWS CDK provisions your resources in a safe, repeatable manner through AWS **CloudFormation**, but also is available (in alpha phase) a CDK for **Terraform** [cdktf](https://github.com/hashicorp/terraform-cdk){:target="_blank"} and a CDK for **Kubernetes** [cdk8s](https://cdk8s.io/){:target="_blank"}. To find all of these CDKs in one place, check out [Construct Hub](https://constructs.dev/){:target="_blank"}, a place to discover and share construct libraries published by the open-source community, AWS, and partners.*

> To me, with a developer background, CloudFormation is complex and CDK fills the gap because it allows me to use a programming language to create the infrastructure easily, it's wonderful.
{: .prompt-info }

### How to deploy infrastructure

I wrote it in another post: [How to create infrastructure with CDK](/posts/how-to-create-infrastructure-with-cdk/){:target="_blank"}

## Price estimation of the blog

I just created the AWS Account, so I will use the **free tier**.

Price information by services used:

- [Route53](https://aws.amazon.com/route53/pricing){:target="_blank"}
- [AWS Amplify](https://aws.amazon.com/amplify/pricing){:target="_blank"}
- [API Gateway](https://aws.amazon.com/api-gateway/pricing){:target="_blank"}
- [DynamoDB](https://aws.amazon.com/dynamodb/pricing/on-demand){:target="_blank"}
- [Lambda](https://aws.amazon.com/lambda/pricing){:target="_blank"}

> I will update it when my `free tier` expires
{: .prompt-warning }

| AWS resource         | Action                            | Free Tier (per month)                  | Estimation price |
|----------------------|-----------------------------------|----------------------------------------|------------------|
| Route53              | Domain Registration               | $1 for domain                          | $1               |
| Route53              | Hosted Zone                       | $0.50 per Hosted Zone for the first 25 | $0.50            |
| AWS Amplify          | Build & Deploy                    | $0 for 1000 build minutes              | $0               |
| AWS Amplify          | Hosting                           | 5 GB stored                            | $0               |
| AWS Amplify          | Hosting                           | $0 for 15 GB served                    | $0               |
| API Gateway          | API calls for REST API            | $0 for 1 million                       | $0               |
| DynamoDB On-demand   | Data Storage on Standard table    | $0 for 25 GB                           | $0               |
| DynamoDB On-demand   | Data transfer out to the internet | $0 for 100 GB                          | $0               |
| Lambda               | Requests per month                | $0 for 1 million                       | $0               |
| Lambda               | Compute time                      | $0 for 400,000 GB-seconds              | $0               |
| CDK & CloudFormation | Free to use                       |                                        | $0               |

**TOTAL 1.5$ per month**. Taxes are NOT included.

> The domain name purchase on Route53 is annual and is paid in the month of purchase, but for simplicity, I split it into each month. Also, the invoice category is NOT Route53 but "Registrar", "Global Region", and "Amazon Registrar DomainRegistration".
{: .prompt-info }

> Use **Route53** for Register Domain is not the cheapest option. I paid $12 instead of around $1 for the first year with GoDaddy, but it's worth it (to me)
{: .prompt-tip }

## Next steps about blog technology

I have many next steps identified, but I'll put here the ones related to the content of this post.

- [ ] Update comments form
- [ ] Show comments in the posts
- [ ] Automate Mail subscription
- [ ] Migrate AWS Amplify Web to S3 + CloudFront + AWS Certificate Manager + Developer Tools

## Comment this post

> I have temporarily added the comments section to the post here. In the future, I will add it in a better way and include all the validated comments (I guess that I will have to make a filter to avoid spam)
{: .prompt-info }

{% include comment-form.html %}
{% include comment-form.js %}
{% include forms.css %}
