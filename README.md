# CroutonChat

A 4-week project where our team created an MVP, full-stack application for our client - PawPrint, LLC. 

### Contributers
[Aleksandar Cakic](https://github.com/aleksandar-cakic)<br/>
[Will Casey](https://github.com/notwillcasey)<br/>
[Layla Grace](https://github.com/thegraceoflayla)<br/>
[Isaac Kim](https://github.com/isaack87)<br/>
[Callum Reid](https://github.com/callumreid)<br/>
[Matthew Saxe](https://github.com/mattsaxe17)<br/>

### Project Overview
- Our team learned React-Native to build a native mobile front-end, supported by a Node.js and PostgreSQL back-end utilizing micro-service architecture. 
- Our client wanted an application to share photos of their pets, without the worry of pet based blackmail. Our solution was to create a chat focused app, that allows users to share photos that will automatically delete after 10 seconds. Our users can follow other users, send messages or photos, and build profiles for their followers to view!


### Video Demo 
![CroutonChat demo gif](BOCdemo.gif)

### How does the app work?
- Create an account and search for your friends with their email addresses.
- Update your profile to introduce yourself to the world.
- Follow your friends and/or build your follower base.
- Send and receive messages or photos with other users.

### What research was required?
- In undertaking this project, our team decided to use a new-to-us framework (React Native), despite the time constraint of only having four weeks to deliver the finished product to our client. Long hours were spent deep in React Native docs, assisted by our background experience in React and component-based frontend design. 
- We wanted to work as close to best practices for git workflow as possible, meaning that we needed to conduct lots of research into how CircleCI can be configured with Jest and React Native in order to ensure only high quality code was put in production. SonarCloud was introduced by a team member, and was quickly incorporated into our continous integration pipeline
- Sending and receiving images is core to the functionality of our application, so we dug into AWS S3 as a solution for image transfer and storage. Through spending the time necessary to get fully acquainted with S3's features and capabilities, we saved time in profile picture upload and edit
- Implementing OAuth in React Native took a bit more work than anticipated. We had to learn how to configure permissions which allowed a native app to access a browser, then retrieve the auth information from the browser in the app itself

### Workflow and Key lessons from your team - specifically those related to: Agile, CI/CD, testing, working with external stakeholders, ticketing, and user stories.
- Our team worked under Agile and Scrum methodologies, starting each meeting with a brief standup to establish the current state of project development. We utilized Trello, Slack, and a self-constructed business requirements google doc to keep all information organized and up to date
- Continous integration was an important consideration throughout development, and we utilized CircleCI and SonarCloud to ensure the quality of code being pull requested. When all the tests passed and quality was deemed appropriate, a team member would perform a static code analysis review before merging. This benefitted us by allowing less down-time for mistakes merged to production

### What additional features do you plan to add, how do you plan to implement those features?
- We would like to add a geolocator feature to our product so that users who are friends are able to find one another and meet up. This is in keeping with the aim of the product, making it a top priority for future development
- Adding an ability for a user to post a "story" that is viewable by all of their friends is another primary goal in future development. This would give more interest to the friends page, as well as viewing a friend's profile

### Technical Challenges






### Tech Stack
<div align="none" ><span align="center"><img width="40" src="https://raw.githubusercontent.com/gilbarbara/logos/master/logos/javascript.svg"/></span>
<span align="center"><img width="40" src="https://raw.githubusercontent.com/gilbarbara/logos/master/logos/nodejs.svg"/></span>
<span align="center"><img width="40" src="https://raw.githubusercontent.com/gilbarbara/logos/master/logos/react.svg"/></span>
<span align="center"><img width="40" src="https://raw.githubusercontent.com/gilbarbara/logos/master/logos/postgresql.svg"/></span>
<span align="center"><img width="40" src="https://raw.githubusercontent.com/gilbarbara/logos/master/logos/jest.svg"/></span>
<span align="center"><img width="40" src="https://raw.githubusercontent.com/gilbarbara/logos/master/logos/aws-ec2.svg"/></span>
<span align="center"><img width="40" src="https://raw.githubusercontent.com/gilbarbara/logos/master/logos/aws-s3.svg"/></span></div>


### Architecture
![CroutonChat Architecture](https://user-images.githubusercontent.com/54588865/142109519-f47d8dc9-74ce-4474-9d63-f7c16e238aa3.jpg)



### CircleCI Build and Test

[![CircleCI](https://circleci.com/gh/rpp29-boc-rebecca-purple/CrutonChat/tree/main.svg?style=svg)](https://circleci.com/gh/rpp29-boc-rebecca-purple/CrutonChat/tree/main)

### Sonar Cloud

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=rpp29-boc-rebecca-purple_CrutonChat&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=rpp29-boc-rebecca-purple_CrutonChat)

[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=rpp29-boc-rebecca-purple_CrutonChat&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=rpp29-boc-rebecca-purple_CrutonChat)

[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=rpp29-boc-rebecca-purple_CrutonChat&metric=bugs)](https://sonarcloud.io/summary/new_code?id=rpp29-boc-rebecca-purple_CrutonChat)

[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=rpp29-boc-rebecca-purple_CrutonChat&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=rpp29-boc-rebecca-purple_CrutonChat)

[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=rpp29-boc-rebecca-purple_CrutonChat&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=rpp29-boc-rebecca-purple_CrutonChat)

[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=rpp29-boc-rebecca-purple_CrutonChat&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=rpp29-boc-rebecca-purple_CrutonChat)

[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=rpp29-boc-rebecca-purple_CrutonChat&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=rpp29-boc-rebecca-purple_CrutonChat)

[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=rpp29-boc-rebecca-purple_CrutonChat&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=rpp29-boc-rebecca-purple_CrutonChat)

[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=rpp29-boc-rebecca-purple_CrutonChat&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=rpp29-boc-rebecca-purple_CrutonChat)

[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=rpp29-boc-rebecca-purple_CrutonChat&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=rpp29-boc-rebecca-purple_CrutonChat)

