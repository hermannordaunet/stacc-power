# My submission for the Future of Fintech Spring 2023 challenge!

## **Theme:** ⚡ Electricity ⚡

As you guys perfectly described:

*"For the past year and a half, electricity prices have been soaring, and it affects us all. To help save on prices, people have quickly become much more conscious about their usage."*
 
The problem of reducing your power bill is, as you said, a two-faced problem. I tried to put focus on choosing the **best** power provider for individual users. Since no one has the same everyday life, the choice of a pricing model that gives each individual the lowest power bill is not easy. 

My approach was that I want to create a lot of API endpoints that can be used in various ways. Both to present the data we have from the users' power consumption, providers, and their pricing model and to create some endpoints that numerically analyze the users' data, calculate some prices of the usage based on the different providers, and some endpoints to compare different providers using the users' data. 

By using the data given to us, we can compute how different pricing models fit the user based on their real life consumption. I think this is a good way to give the average people more insight into their power bill and motivate them to change the provider if they see that another provider can offer them a lower power bill based on their real consumption and not just what the media and other providers tell them.

There are many different ways if determining if a provider is good or bad. Not just the pricing and monthley fees, but also how they get their energy. Since I could not find a good API to get the the distribution of where the power originates from I desided to go for the classification of which provider is cheaper for the user. If I had found this information I think this would be a good thing to present to the user. Many people like to know that the power they are getting is 100% clean. 

Other things that can help users when looking at the data we present is to show how the weather was at the given time. I tried to also create some usable endpoints to get some weather data from data I found. 

So in this task, we want you to create an application or service that can help consumers choose the power provider that is cheapest for them.
There are many considerations and approaches to solving such a problem, you are therefore free to solve this task in any way you want. You are free to focus on frontend, backend, design or everything combined. Creativity is encouraged!
 - One important consideration is **explainability**. There may be multiple factors that determine if a provider is _good_ or _bad_, please make an effort to detail why we can classify it as one or the other. 

## Starting point

You are free to base you solution from the web application packaged in this repo. It is a Javascript and React application that contains a simple data fetcher and a library for displaying the data in graphs. If you use this repository as the base, please read the [How to run](https://github.com/stacc/future-of-fintech-V2023/blob/main/how-to-run.md) file on how to do so.

Otherwise are you free to start from scratch and take the assignment in any direction that you want. The only requirement is that it remains related to fintech. There are likely many other starting points to take inspiration from, one example being [Strømpris.no](https://www.strompris.no/)


## Data

We have created two different datasets that you can either read/copy directly from the folder. One is for the power consumption the last 500 hours for one household, the second is the prices and price models of some made up power providers. They are located in the `data` folder in this repository


The data is also available through an API. So if you for example go to `https://future-of-fintech-v2023.vercel.app/api/providers` you will get the same data.

Endpoints:

`https://future-of-fintech-v2023.vercel.app/api/providers`, `https://future-of-fintech-v2023.vercel.app/api/consumption`

--

## Get in touch!

We also have a dedicated _[discord channel](https://discord.gg/s2RyPJvBqQ)_ where past and present participants can chat about anything and everything.
The admins are also listening to this channel so feel free to reach out!

[![Joing us on Discord](https://assets-global.website-files.com/6257adef93867e50d84d30e2/62594fddd654fc29fcc07359_cb48d2a8d4991281d7a6a95d2f58195e.svg)](https://discord.gg/s2RyPJvBqQ)

[If everything fails then we also have an email -> challenge@stacc.com :) ](mailto:challenge@stacc.com)

--

## How to deliver

### Important!

> We advise you to be conscious about how your work can be assessed. Make it simple to access, run, and review. 😊

> We can only review work that we can run, so make sure to package dependencies, include instructions, etc.

> If you are able to host your system in any form, please do! ([Vercel](https://vercel.com/), [Netlify](https://www.netlify.com/), [Heroku](https://www.heroku.com/home) and [Github Pages](https://pages.github.com/) are some great free hosting alternatives)

### Design/UX

1. Somewhere where your sketch is stored. This can be a link to a Figma-, XD-, or sketch document or a set of pictures.
2. Feel free to supplement with something that explains what you have designed, why you designed it like that and what you might have improved upon if you were to do it differently or had more time. 🕒 These can also be embedded directly into your design document if your design software supports it.
3. [ Send it to challenge@stacc.com 📬 ](mailto:challenge@stacc.com)

### Code

1. We prefer to have your work published as a **public git repository**.
2. If you do not want your work to be public then please contact us so that you can share it with your reviewers directly.
3. You need to include an _readme.md_ file that details some basic information about your project.  
   [The template can be found here](https://github.com/stacc/stacc-challenge-public/blob/main/readme.md.template)
4. We also strongly suggest that you make an assessment of how your application can be run on other systems.
5. [ Send it to challenge@stacc.com 📬 ](mailto:challenge@stacc.com)
