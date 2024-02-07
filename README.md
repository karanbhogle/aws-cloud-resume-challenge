
# The Cloud Resume Challenge - AWS
The Cloud Resume Challenge, by [Forrest Brazeal](https://forrestbrazeal.com/), is a hands-on project designed to help you bridge the gap from cloud certification to cloud job. It is a challenge to help people to prepare for a job in the cloud industry. 

This is my attempt at the AWS Cloud Resume Challenge, showcasing my journey in building a dynamic cloud-based resume.


## Architecture
![Karan's AWS Cloud Resume Challenge Architecture]([https://github.com/karanbhogle/aws-cloud-resume-challenge/blob/main/resume-static-website/assets/img/aws-crc-arch.png?raw=true](https://miro.medium.com/v2/resize:fit:1100/format:webp/1*yBm16V2xAPsPVxRCFpT6GQ.jpeg))

**Services Used:**

- **AWS** - [Amazon S3](https://aws.amazon.com/s3/) | [Amazon Route53](https://aws.amazon.com/route53/) | [AWS CloudFront](https://aws.amazon.com/cloudfront/) | [Amazon Certificate Manager](https://aws.amazon.com/certificate-manager/) | [AWS Lambda](https://aws.amazon.com/lambda/) | [DynamoDB](https://aws.amazon.com/dynamodb/) | [GitHub Actions](https://github.com/features/actions)
- **GitHub Actions** - For CI/CD
## The Challenge

1. **Certification**: Earned my [AWS Cloud Practitioner](https://www.credly.com/badges/946d0742-ed7d-4986-896f-69d8e61d383d) certification and went the extra mile to achieve the [AWS Solution Architect - Associate](https://www.credly.com/badges/23fddbdf-756f-4f2c-a525-7a74ac642cdc) certification.

2. **HTML**: Downloaded a resume template instead of creating it from scratch and replaced the pre-filled data with my actual resume information.

3. **CSS**: Modified the CSS of the downloaded template to match my personal preferences, including changes to primary color, secondary color, text color, size, font, and element resizing.

4. **Static Website**: Hosted the static website using an Amazon S3 bucket.

5. **HTTPS**: Ensured that the S3 bucket is blocked for public access and is accessible through my Amazon CloudFront distribution.

6. **DNS**: Initially considered using the CloudFront URL instead of registering a domain name to save costs but eventually purchased one using [Route 53](https://aws.amazon.com/route53) (karanbhogle.net) to enhance my learning experience.

7. **JavaScript**: Opted to fetch the profile view count server-side rather than on the client-side. This involved invoking a Lambda function to retrieve the profile view count.

8. **Database**: Utilized DynamoDB to store the profile view count data.

9. **API**: Utilized the Lambda function URL to invoke a Python code in the next step. Execution of the Lambda function was allowed only from the origin "https://resume.karanbhogle.net" using the CORS configuration setting of the Lambda Function URL.

10. **Python**: Created a Lambda function using Python and utilized the `boto3` library for AWS resource access. This Python function retrieved the current profile view count from Amazon DynamoDB, incremented it by 1, updated the value in DynamoDB, and returned the incremented value to the JavaScript function that invoked it.

11. **Tests**: Omitted testing for such a basic Lambda function.

12. **Infrastructure as Code**: Did not perform Infrastructure as Code using SAM/CloudFormation or Terraform, as it is more of a DevOps operation. However, gathered sufficient knowledge on how to create a CloudFormation or Terraform template.

13. **Source Control**: Used GitHub to push the static website code to my repository for source control.

14. **CI/CD (Back end)**: Given the absence of significant backend components, no specific actions were taken in this regard.

15. **CI/CD (Front end)**: Created GitHub Actions to automatically update the S3 bucket when new website code is pushed.

16. **Blog Post**: Here is the associated [Medium Blog Post](https://medium.com/@karanbhogle/my-journey-from-aws-certifications-to-the-cloud-resume-challenge-09b728270699).


It was a fun and educating experience doing this project. 


**Farewell.**
