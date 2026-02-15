const quizData = [];
// const quizData = [
//     {
//         "question": "Universal Containers (UC) currently owns a middleware tool and has developed an API-led Integration architecture with three API tiers: The first tier interfaces directly with the systems of engagement, the second tier implements business logic and aggregates data, and the third tier interfaces directly with the systems of record. Some of the systems of engagement will be a mobile application, a web application, and Salesforce. UC has a business requirement to return data to the systems of engagement in different formats while also enforcing different security protocols. What should an integration architect recommend to meet these requirements? ",
//         "answers": {
//             "a": "Enforce separate security protocols and return formats at the first tier of the API-led architecture. ",
//             "b": "Implement an API Gateway that all systems of engagement must interface with first. ",
//             "c": "Leverage an Identity Provider solution that communicates with the API tiers via SAML. "
//         },
//         "correctAnswer": "b",
//         "explanation": "An API Gateway is a standard architectural pattern that acts as a single entry point for all clients. It is the ideal place to handle cross-cutting concerns like security enforcement (authentication, rate limiting), request/response transformation (e.g., converting data to different formats for mobile vs. web clients), and routing to the appropriate backend services. This decouples the client applications from the backend API implementation.",
//         "multiSelect": false
//     },
//     {
//         "question": "Northern Trail Outfitters requires an Integration to be set up between one of its Salesforce orgs and an External Data Source using Salesforce Connect. The External Data Source supports Open Data Protocol. Which configuration should an Integration architect recommend be implemented in order to secure requests coming from Salesforce? ",
//         "answers": {
//             "a": "Configure a certificate for OData connection. ",
//             "b": "Configure Special Compatibility for OData connection. ",
//             "c": "Configure Identity Type for OData connection. "
//         },
//         "correctAnswer": "c",
//         "explanation": "When setting up an external data source in Salesforce Connect, the Identity Type field is the primary configuration for securing requests. It determines how Salesforce authenticates to the external system. The options are typically 'Per User' (where each user's credentials are used) or 'Named Principal' (where a single, shared set of credentials is used for all users). This directly controls the authentication aspect of the integration.",
//         "multiSelect": false
//     },
//     {
//         "question": "An Integration architect needs to build a solution that will use the Streaming API, but the data loss should be minimized, even when the client re-connects every couple of days. Which two types of Streaming API events should be considered? ",
//         "answers": {
//             "a": "High Volume Platform and Generic Events ",
//             "b": "Change Data Capture and High Volume Platform Events ",
//             "c": "Push Topic and Change Data Capture Events "
//         },
//         "correctAnswer": [
//             "b"
//         ],
//         "explanation": "To minimize data loss when a client might be disconnected for days, event durability is the key factor. Change Data Capture (CDC) events and Platform Events (including High-Volume ones) are retained on the Salesforce Event Bus for up to 72 hours (3 days). This allows a client to reconnect after a 'couple of days' and use a stored replay ID to retrieve all missed messages. In contrast, PushTopic and Generic events are only retained for 24 hours.",
//         "multiSelect": true
//     },





//     {
//         "question": "An enterprise customer is planning to implement Salesforce to support case management. Considering Salesforce capabilities and the provided system landscape, what should the integration architect evaluate when integrating Salesforce with the current system landscape? ",
//         "answers": {
//             "a": "Integrate Salesforce with Data Warehouse, Order Management and Email Management System. ",
//             "b": "Integrate Salesforce with Order Management System, Data Warehouse and Case Management System. ",
//             "c": "Integrate Salesforce with Email Management System, Order Management System and Case Management System. "
//         },
//         "correctAnswer": "a",
//         "explanation": "Since Salesforce is being implemented for Case Management, it will replace the existing 'Case Management System'. Salesforce Service Cloud also has robust 'Email-to-Case' functionality, which can replace the business logic of the 'Email Management System'. Therefore, these two systems are candidates for retirement, not integration. To provide a 360-degree view for support agents, Salesforce will need to be integrated with the Order Management System (to view customer orders) and the Data Warehouse (for analytics and BI). The source Email Management System (like an Exchange server) would still need to be evaluated for integration to feed emails into Salesforce.",
//         "multiSelect": false
//     },






//     {
//         "question": "A company's security assessment noted vulnerabilities on the unmanaged packages in its Salesforce orgs; notably, secrets that are easily accessible and in plain text, such as usernames, passwords, and OAuth tokens used in callouts from Salesforce. Which persistence mechanisms should an Integration architect require to be used to ensure that secrets are protected from deliberate or inadvertent exposure? ",
//         "answers": {
//             "a": "Protected Custom Metadata Types and Named Credentials",
//             "b": "Encrypted Custom Fields and Protected Custom Settings",
//             "c": "Named Credentials and Protected Custom Settings "
//         },
//         "correctAnswer": "a",
//         "explanation": "Named Credentials are the Salesforce best practice for storing the URL of a callout endpoint and its required authentication parameters in one definition. They abstract the credentials from code and handle the authentication handshake. Protected Custom Metadata Types are ideal for storing other application secrets (like API keys). Their values are not visible in subscriber orgs when used in a managed package and can be accessed securely via Apex.",
//         "multiSelect": false
//     },



//     {
//         "question": "Northern Trail Outfitters needs to secure an Integration with an external Microsoft Azure API Gateway. Which Integration security mechanism should be employed? ",
//         "answers": {
//             "a": "Use an API-only user profile and implement an external identity provider with federated API access. ",
//             "b": "Configure mutual server authentication with two-way SSL using certification authority (CA) signed certificates. ",
//             "c": "Configure a connected app with an authorization endpoint of the API Gateway and configure OAuth settings. "
//         },
//         "correctAnswer": "b",
//         "explanation": "Mutual authentication (also known as two-way SSL or mTLS) is a very strong security mechanism for server-to-server communication. It ensures that both the client (Salesforce) and the server (Azure API Gateway) verify each other's identity by exchanging and validating digital certificates. This establishes a highly secure and trusted communication channel, which is ideal for enterprise-level integrations.",
//         "multiSelect": false
//     },





//     {
//         "question": "An Integration architect has built a solution using REST API, updating Account, Contact, and other related information. The data volumes have increased, resulting in higher API calls consumed, and some days the limits are exceeded. A decision was made to decrease the number of API calls using bulk updates. The customer prefers to continue using REST API to avoid architecture changes. Which REST API composite resources should the integration architect use to allow up to 200 records in one API call? ",
//         "answers": {
//             "a": "Composite ",
//             "b": "Batch ",
//             "c": "SObject Tree "
//         },
//         "correctAnswer": "c",
//         "explanation": "The SObject Tree REST API resource is specifically designed for creating multiple related or unrelated records in a single request. A key feature and limit of this resource is its ability to process a collection of sObject trees containing up to a total of 200 records in a single API call, making it the correct choice for this bulk update requirement. The standard Composite and Batch resources are limited to 25 subrequests.",
//         "multiSelect": false
//     },





//     {
//         "question": "The director of customer service at Northern Trail Outfitters wants to capture and trend specific business events that occur in Salesforce in real time. The metrics will be accessed in an ad-hoc manner using an external analytics system. The events include user clicks on specific menu items within a Case. Which solution should meet these business requirements? ",
//         "answers": {
//             "a": "Case Workflow Rule that sends an Outbound Message ",
//             "b": "Case after Insert Trigger that executes a callout ",
//             "c": "Case Trigger after Insert, after update to publish the platform event "
//         },
//         "correctAnswer": "c",
//         "explanation": "This scenario requires an event-driven architecture to notify an external system of business events (not just data changes) in real time. Platform Events are the ideal solution. A trigger on the Case object can publish a custom platform event when the specific conditions are met (e.g., a field is updated by the menu item click). This asynchronously and reliably sends the event to the event bus, where the external analytics system can subscribe to receive it, decoupling the two systems.",
//         "multiSelect": false
//     },






//     {
//         "question": "Universal Containers (UC) is a global financial company that sells financial products and services. There is a daily scheduled Batch Apex job that generates invoices from a given set of orders. UC requested building a resilient integration for this Batch Apex job in case the invoice generation fails. What should an Integration architect recommend to fulfill the requirement? ",
//         "answers": {
//             "a": "Build Batch Retry and Error Handling using BatchApexErrorEvent. ",
//             "b": "Build Batch Retry and Error Handling in the Batch Apex job itself. ",
//             "c": "Build Batch Retry and Error Handling in the middleware. "
//         },
//         "correctAnswer": "a",
//         "explanation": "The BatchApexErrorEvent is a standard platform event fired by Salesforce whenever an unhandled exception occurs in a Batch Apex job. Subscribing to this event with a trigger is the recommended, modern best practice for building resilient batch processes. The event payload contains details about the failed job and the records that failed, allowing you to implement robust, centralized logic for retries, logging, or notifications.",
//         "multiSelect": false
//     },





//     {
//         "question": "A customer imports data from an external system into Salesforce using Bulk API. These jobs have batch sizes of 2,000 and are run in parallel mode. The batches fail frequently with the error 'Max CPU time exceeded'. A smaller batch size will fix this error. What should be considered when using a smaller batch size? ",
//         "answers": {
//             "a": "Smaller batch size may increase time required to execute bulk jobs. ",
//             "b": "Smaller batch size can trigger 'Too many concurrent batches' error. ",
//             "c": "Smaller batch size may exceed the concurrent API request limits. "
//         },
//         "correctAnswer": "a",
//         "explanation": "While reducing the batch size prevents individual batches from hitting CPU limits, it increases the total number of batches required to process the same amount of data. Each batch has a certain amount of processing overhead. By increasing the number of batches, you increase the total overhead, which in turn increases the overall time required for the entire bulk job to complete.",
//         "multiSelect": false
//     },





//     {
//         "question": "An integration architect has built a Salesforce application that integrates multiple systems and keeps them synchronized via Platform Events. What is taking place if events are only being published? ",
//         "answers": {
//             "a": "The platform events are published after the Apex transaction completes. ",
//             "b": "The platform events are published immediately before the Apex transaction completes. ",
//             "c": "The platform events are being published from Apex. "
//         },
//         "correctAnswer": "a",
//         "explanation": "Platform events published via Apex have transactional guarantees. The call to EventBus.publish() queues the event, but the event is not actually sent to the event bus until after the Apex transaction successfully commits to the database. If the transaction fails and is rolled back, the queued events are discarded and never published. This ensures that subscribers are not notified of database changes that never actually happened.",
//         "multiSelect": false
//     },





//     {
//         "question": "When a contact record in Salesforce is updated, an external homegrown application should also be updated. The synchronization should be event-driven and asynchronous. Which option should an architect recommend? ",
//         "answers": {
//             "a": "Use an extract, transform, load (ETL) tool to keep Salesforce and the homegrown application in sync on a regular cadence. ",
//             "b": "Leverage Platform Events to publish a custom event message containing changes to the Contact object. ",
//             "c": "Leverage Change Data Capture to track changes to the Contact object and write a CometD subscriber on the homegrown application. "
//         },
//         "correctAnswer": "c",
//         "explanation": "Change Data Capture (CDC) is the ideal Salesforce feature for this use case. It is designed specifically to stream record changes (creates, updates, deletes) to external systems. It is event-driven, asynchronous, and requires no custom Apex trigger code—you simply enable it on the Contact object. The homegrown application can then subscribe to the event stream using a CometD client to receive near real-time updates, making it a more declarative and efficient solution than building a custom Platform Event publisher.",
//         "multiSelect": false
//     },





//     {
//         "question": "Northern Trail Outfitters is planning to perform nightly batch loads into Salesforce from an external system with a custom Java application using the Bulk API. The CIO is curious about monitoring recommendations for the jobs from the technical architect. Which recommendation should help meet the requirements? ",
//         "answers": {
//             "a": "Use the getBatchInfo method in the Java application to monitor the status of the jobs from the Java application. ",
//             "b": "Write the error response from the Bulk API status to a custom error logging object in Salesforce using an Apex trigger, and create reports on the object. ",
//             "c": "Set the Salesforce debug logs level to 'finest', and add the user ID running the job to monitor in the 'Debug Logs' in the setup menu. "
//         },
//         "correctAnswer": "a",
//         "explanation": "Since the integration is being orchestrated by an external Java application, the most logical and efficient place to monitor it is within that same application. The Bulk API is asynchronous; after submitting a job, the client application is expected to poll for status. The API provides endpoints to get the status of the job and details for each batch, including success/failure counts and error messages. The Java app can use these responses to perform its own logging and alerting.",
//         "multiSelect": false
//     },





//     {
//         "question": "After the order details are captured in Salesforce, an order must be created in the remote system, which manages the order's lifecycle. The integration architect for the project is recommending a remote system that will subscribe to the platform event defined in Salesforce. Which integration pattern should be used for this business use case? ",
//         "answers": {
//             "a": "Fire and Forget ",
//             "b": "Request and Reply ",
//             "c": "Remote Call-In "
//         },
//         "correctAnswer": "a",
//         "explanation": "This scenario perfectly describes the Fire and Forget pattern. Salesforce (the source) publishes a platform event and then moves on without waiting for an acknowledgment or response. It has 'fired' the message and 'forgotten' about it. The remote system (the target) subscribes to the event and processes it independently and asynchronously. This decouples the systems, making the architecture more resilient.",
//         "multiSelect": false
//     },





//     {
//         "question": "About 3,000 phone sales agents use a Salesforce Lightning UI to check customer eligibility. The external eligibility system can take up to 90 seconds to respond, but an API Gateway in the middle imposes a 9-second timeout. Which recommendation should the integration architect make? ",
//         "answers": {
//             "a": "Recommend synchronous Apex callouts from Lightning UI to External Systems via Mule and implement polling on an API Gateway timeout.",
//             "b": "Implement a 'Check Update' button that passes a requestID received from ESB (user action needed). ",
//             "c": "Create a platform event in Salesforce via Remote Call-In and use the empAPI in the Lightning UI to serve 3,000 concurrent users when responses are received by Mule. "
//         },
//         "correctAnswer": "c",
//         "explanation": "This is a classic long-running callout problem that requires an asynchronous solution. The best pattern is: 1) The UI makes a callout to the ESB (MuleSoft). 2) The ESB immediately returns a correlation ID and starts the 90-second background process. 3) When the ESB gets the final response, it makes a Remote Call-In to Salesforce's API to publish a Platform Event. 4) The Lightning component, which has been listening via the empAPI, receives the event and updates the UI automatically. This provides a real-time update to the user without polling or hitting timeouts.",
//         "multiSelect": false
//     },





//     {
//         "question": "Northern Trail Outfitters needs to present shipping costs and estimated delivery times to its customers. Shipping services used vary by region and have similar but distinct service request parameters. Which integration component capability should be used? ",
//         "answers": {
//             "a": "Apex REST Service to implement routing logic to the various shipping service ",
//             "b": "Enterprise Service Bus to determine which shipping service to use and transform requests to the necessary format ",
//             "c": "Enterprise Service Bus user interface to collect shipper-specific form data "
//         },
//         "correctAnswer": "b",
//         "explanation": "This is a prime use case for an Enterprise Service Bus (ESB) or middleware. The key requirements are routing (selecting the correct shipping service based on region) and transformation (converting a standard request from Salesforce into the unique format required by each specific shipping service). An ESB is designed to handle this complexity, decoupling Salesforce from the various external systems and simplifying the integration.",
//         "multiSelect": false
//     },
//     {
//         "question": "Northern Trail Outfitters is in the final stages of merging two Salesforce orgs, but needs to keep the retiring org available for a short period of time for lead management as it is connected to multiple public website forms. The sales department has requested that new leads are available in the new Salesforce instance within 30 minutes. Which approach requires the least amount of development effort? ",
//         "answers": {
//             "a": "Call the Salesforce REST API to insert the lead into the target system. ",
//             "b": "Use the Tooling API with Process Builder to insert leads in real time. ",
//             "c": "Use the Composite REST API to aggregate multiple leads in a single call. "
//         },
//         "correctAnswer": "a",
//         "explanation": "For a simple, one-way push of new records between orgs, the most direct and lowest-effort approach is to use automation in the source org to call the standard Salesforce REST API of the target org. This can be implemented with a low-code tool like Flow (using an HTTP Callout action) or a simple Apex trigger. This creates a direct point-to-point integration sufficient for the temporary requirement.",
//         "multiSelect": false
//     },





//     {
//         "question": "Northern Trail Outfitters (NTO) uses a custom mobile app to interact with its customers. One of the features of the app is Salesforce Chatter Feeds. NTO wants to automatically post a Chatter item to Twitter whenever the post includes the #thanksNTO hashtag. Which API should an integration architect use to meet this requirement? ",
//         "answers": {
//             "a": "Streaming API to generate Push Topic ",
//             "b": "REST API ",
//             "c": "Connect REST API "
//         },
//         "correctAnswer": "c",
//         "explanation": "The Connect REST API is specifically designed for building social collaboration applications and integrating with Chatter, communities, and feeds. It provides a higher-level, more intuitive set of resources for working with these features than the standard REST API. For any task involving reading from or posting to Chatter, the Connect API is the purpose-built and recommended tool.",
//         "multiSelect": false
//     },





//     {
//         "question": "A company has to verify a trainer with 10 different external verification agencies before they can provide training. Each agency has its own web service and response time, which could take days. What is the recommended approach to automate this process? ",
//         "answers": {
//             "a": "Use middleware to handle the callout to the 10 different verification services; the middleware will handle the business logic of consolidating the verification result from the 10 services. Then, make a call-in to Salesforce and update the verification status to 'verified'. ",
//             "b": "Use Salesforce External Service to make the callout; Salesforce External Service should check the verification agencies until the result is verified. Then, update the trainer status to 'verified'. ",
//             "c": "Make an Apex callout using @future annotation to make the callout to all different agencies; the response should update the trainer status to 'verified'. "
//         },
//         "correctAnswer": "a",
//         "explanation": "This scenario involves complex, long-running process orchestration with multiple external systems. This is a classic use case for a middleware platform. The middleware can manage the stateful, long-running process of calling all 10 services, handling their individual responses and potential failures over several days, and consolidating the final result. Once the entire process is complete, the middleware makes a single, simple call-in to Salesforce to update the final status. This pattern keeps the complex orchestration logic out of Salesforce, which is not designed for such long-running stateful processes.",
//         "multiSelect": false
//     },





//     {
//         "question": "An Identity and Access Management (IAM) system, which supports SAML and OpenId, was recently implemented to improve the subscriber experience through self-registration and single sign-on (SSO). The IAM system must integrate with Salesforce to give new self-service customers instant access to Salesforce Community Cloud. Which requirement should Salesforce Community Cloud support for self-registration and SSO? ",
//         "answers": {
//             "a": "OpenId Connect Authentication Provider and Just-in-Time (JIT) provisioning",
//             "b": "OpenId Connect Authentication Provider and Registration Handler ",
//             "c": "SAML SSO and Registration Handler "
//         },
//         "correctAnswer": "b",
//         "explanation": "For self-registration, where users are creating their accounts for the first time via an external system, a Registration Handler is required. This is an Apex class that Salesforce invokes after the initial authentication to create the new User record and link it to an Account or Contact. For SSO, you would configure an Authentication Provider in Salesforce (such as OpenID Connect or SAML) that points to the external IAM system. Combining the Auth Provider with a Registration Handler provides a complete solution for both SSO and self-registration.",
//         "multiSelect": false
//     },
//     {
//         "question": "A company accepts payment requests 24/7. The diagram shows a simplified flow where a 'fire and forget' call enqueues a request in a Payment System, which is processed later. The company encounters intermittent update errors when two or more processes try to update the same Payment Request record at the same time. Which recommendation should an integration architect make to improve the company's SLA and update conflict handling?",
//         "answers": {
//             "a": "Middleware should coordinate request delivery and payment processing.",
//             "b": "Payment System and Middleware should automatically retry requests.",
//             "c": "Payment System should process a payment request only once."
//         },
//         "correctAnswer": "c",
//         "explanation": "The root cause of the update conflicts is likely a race condition where a single payment request might be processed more than once, especially in retry scenarios. The most effective way to solve this is to make the payment processing system idempotent. This means the system is designed to handle the same request multiple times but execute the actual business logic (the payment) only once. By tracking the unique identifier for each payment request, the Payment System can ensure it processes each request exactly once, safely ignoring any duplicates and thus eliminating the source of the update conflicts.",
//         "multiSelect": false
//     },


//     {
//         "question": "What is the first thing an Integration architect should validate if a callout from a Lightning web component to an external endpoint is failing?",
//         "answers": {
//             "a": "The endpoint URL has been added to Remote Site Settings.",
//             "b": "The endpoint domain has been added to Cross-Origin Resource Sharing.",
//             "c": "The endpoint URL has been added to Content Security Policies."
//         },
//         "correctAnswer": "b",
//         "explanation": "Lightning Web Components run client-side in the user's browser. When JavaScript in a browser attempts to make a request to a different domain than the one it's served from, the browser's Same-Origin Policy will block the request for security reasons. To allow this, the external server must approve the request using the Cross-Origin Resource Sharing (CORS) standard, and the Salesforce admin must whitelist that domain in the org's CORS settings. Remote Site Settings are for server-side (Apex) callouts, not client-side ones.",
//         "multiSelect": false
//     },


//     {
//         "question": "A large consumer goods manufacturer is implementing Salesforce globally and has complex security requirements for different user types (internal, customer, partner) who need to authenticate against different systems (local Active Directory, Google, central partner system). Which requirement should the integration architect evaluate while designing the integration needs of this project?",
//         "answers": {
//             "a": "Evaluate Salesforce native authentication mechanism for all users including customers and partners.",
//             "b": "Evaluate the build of a custom authentication mechanism for users in each country and support for customers and partners.",
//             "c": "Consider a third-party single sign-on (SSO) solution supporting all user authentication including customer and partner."
//         },
//         "correctAnswer": "c",
//         "explanation": "This scenario involves a complex and diverse identity landscape. Attempting to manage point-to-point authentication integrations for each user type and system directly in Salesforce would be brittle and hard to maintain. The standard architectural solution is to use a third-party single sign-on (SSO) or Identity and Access Management (IAM) solution. This central identity broker can federate all the different identity providers (AD, Google, etc.) and present a single, consistent authentication protocol (like SAML or OpenID Connect) to Salesforce, greatly simplifying the architecture and centralizing security control.",
//         "multiSelect": false
//     },


//     {
//         "question": "Northern Trail Outfitters is seeking to improve the performance and security of outbound integrations from Salesforce to on-premise servers. What should the integration architect consider before recommending a solution?",
//         "answers": {
//             "a": "Default gateway restrictions",
//             "b": "External gateway products in use",
//             "c": "Shield Platform Encryption limitations"
//         },
//         "correctAnswer": "b",
//         "explanation": "Integrating from a cloud platform like Salesforce to an on-premise system requires passing through the company's network perimeter. The architect must first understand the security infrastructure at this boundary, which means identifying the external gateway products in use (e.g., firewalls, reverse proxies, API Gateways). These products dictate the security protocols, authentication mechanisms, and access policies (like IP whitelisting or mTLS) that any integration solution must adhere to.",
//         "multiSelect": false
//     },


//     {
//         "question": "An order is created in Salesforce when an opportunity is Closed/Won, but the back-end ERP is the data master for the order. The customer wants to be able to see within Salesforce all the stages of order processing, like Order Created, Order Shipped, and Order Paid. Which message durability consideration should an integration architect make when designing a solution to meet these business requirements?",
//         "answers": {
//             "a": "When subscribing to Salesforce Event Bus, ReplayID is used with a value of -1 to be able to see new events.",
//             "b": "High-volume event messages are stored for 24 hours (1 day).",
//             "c": "When subscribing to Salesforce Event Bus, ReplayID is used with a value of 2 to be able to see old and new events."
//         },
//         "correctAnswer": "a",
//         "explanation": "The concept of ReplayID is central to message durability on the Salesforce Event Bus. It allows a subscriber to specify from what point in the event stream it wishes to receive messages. A subscriber uses a ReplayID of -1 to indicate that it only wants to receive new events published after it connects. This is a fundamental design consideration for any event subscriber to ensure it doesn't process old, irrelevant messages upon connection. (Note: A ReplayID of -2 is used to receive all stored events within the retention window).",
//         "multiSelect": false
//     },


//     {
//         "question": "Given the diagram, call center agents using Salesforce need to view historical case data (20M+ records) which is archived in an external Historical Data Store. Which mechanism and patterns are recommended to maximize declarative configuration?",
//         "answers": {
//             "a": "Use an ESB tool with a Data Virtualization pattern, expose the OData endpoint, and then use Salesforce Connect to consume and display the external object along side the Case object.",
//             "b": "Use an ESB tool with a Request and Reply pattern, and then make a real-time Apex callout to the ESB endpoint to fetch and display historical data in a custom Lightning component related to the Case object.",
//             "c": "Use an ESB tool with a Fire and Forget pattern, and then publish a platform event for the requested historical data."
//         },
//         "correctAnswer": "a",
//         "explanation": "The key requirements are viewing large volumes of external data in real-time and maximizing declarative setup. This is the precise use case for the Data Virtualization pattern, which is implemented in Salesforce via Salesforce Connect. The best approach is to have the middleware (ESB) expose the data store as an OData endpoint. Then, declaratively in Salesforce, you can create an External Object that maps to this data. This allows the historical data to be displayed on page layouts and in related lists just like native data, all without writing custom code.",
//         "multiSelect": false
//     },


//     {
//         "question": "Northern Trail Outfitters (NTO) has a requirement to encrypt a few widely-used standard fields. NTO also wants to be able to use these fields in record-triggered flows. Which security solution should an integration architect recommend to fulfill the business use case?",
//         "answers": {
//             "a": "Shield Platform Encryption",
//             "b": "Data Masking",
//             "c": "Classic Encryption"
//         },
//         "correctAnswer": "a",
//         "explanation": "Shield Platform Encryption is the appropriate solution for encrypting data at rest while preserving critical application functionality. It supports a broad range of standard and custom fields and, importantly, allows many of them to be used in automations like record-triggered flows, validation rules, and other business logic. Classic Encryption is far more limited and does not support use in flows, while Data Masking is a tool for anonymizing data in sandboxes, not for production encryption.",
//         "multiSelect": false
//     },

//     {
//         "question": "Universal Containers (UC) has embarked on a Salesforce transformation journey to allow students to register for courses in the Salesforce Community. UC has a learning system that masters all courses and student registration. UC requested a near real-time feed of student registration from Salesforce to the learning system. The integration architect recommends using Salesforce Platform Events. Which API should be used for the Salesforce platform event solution?",
//         "answers": {
//             "a": "REST API",
//             "b": "SOAP API",
//             "c": "Streaming API"
//         },
//         "correctAnswer": "c",
//         "explanation": "External clients subscribe to and receive Platform Events using the Streaming API. The Streaming API provides a long-polling mechanism (based on the CometD protocol) that allows the external learning system to maintain a persistent connection to Salesforce and receive event notifications in near real-time as they are published. The REST and SOAP APIs are used for request-reply interactions, not for subscribing to event streams.",
//         "multiSelect": false
//     },


//     {
//         "question": "A developer has been tasked by the integration architect to build a solution based on the Streaming API. The developer has done some research and has found there are different implementations of the events in Salesforce (PushTopic Events, Change Data Capture, Generic Streaming, Platform Events), but is unsure of how to proceed with the implementation and asks the system architect for some guidance. What should the architect consider when making the recommendation?",
//         "answers": {
//             "a": "Push Topic Events can define a custom payload.",
//             "b": "Change Data Capture can be published from Apex.",
//             "c": "Change Data Capture does not have record access support."
//         },
//         "correctAnswer": "c",
//         "explanation": "This question tests knowledge of the nuances between event types. Change Data Capture (CDC) events broadcast record changes for all users, regardless of the subscribing user's record-level access or sharing settings in Salesforce. The subscribing system is responsible for enforcing data visibility rules. In contrast, PushTopic events do respect the running user's record visibility. This is a critical security consideration when choosing between the two. The other statements are false: PushTopic payloads are fixed, and CDC events are published by the platform, not Apex.",
//         "multiSelect": false
//     },


//     {
//         "question": "A new Salesforce program has the following high-level abstract requirement: Business processes executed on Salesforce require data updates between their internal systems and Salesforce. Which relevant detail should an integration architect seek to specifically solve for integration architecture needs of the program?",
//         "answers": {
//             "a": "Core functional and non-functional requirements for User Experience design, Encryption needs, Community, and license choices",
//             "b": "Timing aspects, real-time/near real-time (synchronous or asynchronous), batch and update frequency",
//             "c": "Integration skills, SME availability, and Program Governance details"
//         },
//         "correctAnswer": "b",
//         "explanation": "To design an integration architecture, the most critical initial details to understand are the non-functional requirements related to data synchronization. This includes the timing aspects: Does the update need to happen instantly (real-time/synchronous)? Can it happen within a few seconds (near real-time/asynchronous)? Or can it happen overnight (batch)? Understanding the frequency and volume of these updates is fundamental to selecting the correct integration pattern, API, and technology.",
//         "multiSelect": false
//     },


//     {
//         "question": "Northern Trail Outfitters needs to make synchronous callouts to 'available-to-promise' services to query product availability and reserve inventory during the customer checkout process. What should an integration architect consider when building a scalable integration solution?",
//         "answers": {
//             "a": "The maximum query cursors open per user on the service",
//             "b": "The typical and worst-case historical response times",
//             "c": "The number of batch jobs that can run concurrently"
//         },
//         "correctAnswer": "b",
//         "explanation": "For a synchronous callout that is part of a user-facing process like checkout, performance is paramount. The integration architect must analyze the typical and worst-case historical response times of the external service. If the service is too slow, it will lead to a poor user experience and potentially hit Salesforce governor limits for transaction time. This analysis determines the feasibility of a synchronous pattern and informs decisions around timeout settings, error handling, and potential fallback mechanisms.",
//         "multiSelect": false
//     },


//     {
//         "question": "Northern Trail Outfitters needs to use Shield Platform Encryption to encrypt social security numbers in order to meet a business requirement. Which action should an integration architect take prior to the implementation of Shield Platform Encryption?",
//         "answers": {
//             "a": "Encrypt all the data so that it is secure.",
//             "b": "Use Shield Platform Encryption as a user authentication or authorization tool.",
//             "c": "Review Shield Platform Encryption configurations."
//         },
//         "correctAnswer": "c",
//         "explanation": "Implementing Shield Platform Encryption is not just a simple switch. It has significant implications on Salesforce functionality. Before implementation, the architect must review the configurations and limitations. This includes identifying which standard and custom fields can be encrypted, understanding the impact on features like reporting, SOQL filtering, sorting, and ensuring that business processes will not be negatively affected. A thorough review prevents unexpected issues after encryption is enabled.",
//         "multiSelect": false
//     },
//     {
//         "question": "A company integrates Salesforce with an Order Management System. Orders must be created in real time from Salesforce, with minimal customizations. Sales reps need to see up-to-date order history and status, and managers need to run reports in Salesforce on order volumes. The legacy system is on-premise and connected to an Enterprise Service Bus (ESB). How should an integration architect integrate the two systems?",
//         "answers": {
//             "a": "Use Salesforce standard object, REST API, and extract, transform, load (ETL).",
//             "b": "Use Salesforce custom object, custom REST API, and extract, transform, load (ETL).",
//             "c": "Use Salesforce external object and OData connector."
//         },
//         "correctAnswer": "a",
//         "explanation": "The requirement to run robust reports on order volumes and timelines is best met by having the data stored natively in Salesforce. This makes option C (External Objects) less suitable, as reporting on external objects has limitations. The best approach is a data synchronization pattern. Use the Salesforce standard Order object for its out-of-the-box features and reporting capabilities. For real-time creation, Salesforce can make a callout to the REST API endpoint provided by the ESB. For keeping status and history up-to-date, an ETL tool can periodically sync data from the master system back into the Salesforce Order records.",
//         "multiSelect": false
//     },

//     {
//         "question": "Which Web Services Description Language (WSDL) should an architect consider when creating an integration that might be used for more than one Salesforce org and different metadata?",
//         "answers": {
//             "a": "SOAP API WSDL",
//             "b": "Enterprise WSDL",
//             "c": "Partner WSDL"
//         },
//         "correctAnswer": "c",
//         "explanation": "The Partner WSDL is specifically designed for integrations that are intended to work across multiple Salesforce orgs. It is loosely-typed, meaning it is not bound to a specific org's metadata (like custom objects or fields). This allows a single client application built against the Partner WSDL to interact with any Salesforce org, dynamically adapting to its unique schema. The Enterprise WSDL is strongly-typed and specific to a single org's metadata.",
//         "multiSelect": false
//     },


//     {
//         "question": "Northern Trail Outfitters uses different shipping services for each of the 34 countries it serves. Services are added and removed frequently. Sales representatives serve all NTO customers globally and need to select between valid service(s) for the customer's country and request shipping estimates from that service. Which solution should an architect propose?",
//         "answers": {
//             "a": "Store shipping services in a picklist that is dependent on a country picklist.",
//             "b": "Invoke middleware service to retrieve valid shipping methods.",
//             "c": "Use Platform Events to construct and publish shipper-specific events."
//         },
//         "correctAnswer": "b",
//         "explanation": "The business logic for determining valid shipping services is complex and changes frequently. Managing this with dependent picklists in Salesforce would be a significant administrative burden. The best practice is to externalize this logic into a middleware service. The Salesforce UI can then make a real-time (Request-Reply) callout to this service, passing the country, and the middleware will return the current list of valid shipping options. This decouples the complex and volatile business logic from the Salesforce platform, making the solution much more agile and maintainable.",
//         "multiSelect": false
//     },


//     {
//         "question": "An integration architect has been tasked with integrating Salesforce with an on-premises system. Due to some established policies, this system must remain on-premises. What should the Integration architect use to build a solution for this requirement?",
//         "answers": {
//             "a": "Use Salesforce Connect if the database supports Open Data Protocol (OData).",
//             "b": "Use Salesforce Connect if the database supports Open Database Connectivity (ODBC).",
//             "c": "Use Heroku Connect if the data is hosted in Heroku."
//         },
//         "correctAnswer": "a",
//         "explanation": "Salesforce Connect provides data virtualization, allowing you to access external data without storing it in Salesforce. One of its primary out-of-the-box adapters is for the Open Data Protocol (OData). If the on-premise system can expose its data via an OData endpoint (which can often be achieved with a simple middleware layer), then Salesforce Connect is a powerful, low-code option for integration. Salesforce does not have a native adapter for ODBC.",
//         "multiSelect": false
//     },


//     {
//         "question": "Universal Containers (UC) works with third-party agencies on large (2.5 GB) design files stored in an on-premise file store. UC wants to collaborate with these agencies and allow them to view the design files in a community. Which solution should an integration architect recommend?",
//         "answers": {
//             "a": "Create a Lightning component with a Request and Reply integration pattern to allow the community users to download the design files.",
//             "b": "Create a custom object to store the file location URL; when a community user clicks on the file URL, redirect the user to the on-premise system file location.",
//             "c": "Use Salesforce Files to link the files to Salesforce records and display the record and the files in the community."
//         },
//         "correctAnswer": "b",
//         "explanation": "Storing a 2.5 GB file directly in Salesforce is impractical and would quickly consume file storage limits. The best approach is to leave the file in the on-premise system of record. You can then create a custom object in Salesforce to store metadata about the file, including its accessible URL. A link on the community page can then redirect the user directly to the file on the on-premise system for viewing or downloading. This leverages the external system for storage while using Salesforce for context and access control.",
//         "multiSelect": false
//     },


//     {
//         "question": "What should an integration architect recommend to ensure all integrations to the Northern Trail Outfitters' company portal use SSL mutual authentication?",
//         "answers": {
//             "a": "Enforce SSL/TLS Mutual Authentication.",
//             "b": "Generate a certification authority (CA) signed certificate.",
//             "c": "Enable My Domain and SSL/TLS."
//         },
//         "correctAnswer": "a",
//         "explanation": "Mutual authentication (mTLS) requires that both the client and the server present valid certificates to identify themselves. To enforce this for inbound API calls to Salesforce, you must navigate to the API Client Whitelisting settings in Setup and enable the preference 'Enforce SSL/TLS Mutual Authentication'. This ensures that any API client attempting to connect must present a valid certificate that Salesforce trusts.",
//         "multiSelect": false
//     },


//     {
//         "question": "The diagram shows a user interaction that involves synchronous and asynchronous calls to consolidate data. The company wants to measure the end-to-end response time from the user's perspective, defined as the difference between the start (A) and finish (H) of the UI interaction. Which computation represents this?",
//         "answers": {
//             "a": "Sum of A to F",
//             "b": "Sum of A to H",
//             "c": "Sum of A and H"
//         },
//         "correctAnswer": "b",
//         "explanation": "The end-to-end response time from a user's perspective is the total elapsed time from their initial action to the final result being displayed. The diagram shows the process starts at point A (2: getSummary) and the final UI render completes at point H (3: render). The duration includes all intermediate synchronous and asynchronous processing steps. Therefore, the total response time is the sum of the durations of all steps from A to H inclusive.",
//         "multiSelect": false
//     },


//     {
//         "question": "A Salesforce customer is planning to roll out Salesforce for all of their sales and service staff. Senior management has requested that monitoring be in place for Operations to notify any degradation in Salesforce performance. How should an integration consultant implement monitoring?",
//         "answers": {
//             "a": "Use Salesforce API Limits to capture current API usage and configure alerts for monitoring.",
//             "b": "Identify critical business processes and establish automation to monitor performance against established benchmarks.",
//             "c": "Use APIEVENT to track all user initiated API calls through SOAP, REST, or Bulk APIs."
//         },
//         "correctAnswer": "b",
//         "explanation": "Effective performance monitoring is not just about technical metrics like API limits; it's about business impact. The best practice is to first identify the critical business processes (e.g., Lead conversion, Case creation, Opportunity closure) that are most important to the users. Then, establish performance benchmarks for these processes (e.g., 'Case creation should take less than 3 seconds'). Finally, implement automated monitoring (often using external tools or Apex tests) to continuously measure performance against these benchmarks and alert Operations when they are not met.",
//         "multiSelect": false
//     },


//     {
//         "question": "A large enterprise customer is implementing Salesforce as its CRM. The current landscape includes an ERP for invoicing/orders and a Marketing solution for email campaigns. Sales and service associates will use Salesforce to log interactions. Which system should be the system of record for customers and prospects?",
//         "answers": {
//             "a": "ERP with all prospect data from Marketing and Salesforce",
//             "b": "Salesforce with relevant Marketing and ERP information",
//             "c": "New Custom Database for customers and prospects"
//         },
//         "correctAnswer": "b",
//         "explanation": "Given that Salesforce is being implemented as the CRM (Customer Relationship Management) system and will be used by sales and service teams to manage all interactions, it is the natural choice to be the system of record for customer and prospect data. Information from the Marketing system (e.g., campaign history) and ERP (e.g., order history) should be integrated into Salesforce to provide a complete 360-degree view of the customer, but Salesforce should own the master customer record.",
//         "multiSelect": false
//     },


//     {
//         "question": "Universal Containers (UC) will decommission its legacy CRM system and migrate data to Salesforce. The data migration team asked for a recommendation to optimize the performance of the data load to Salesforce. Which approach should be used to meet the requirement?",
//         "answers": {
//             "a": "Use Bulk API to process jobs in parallel mode.",
//             "b": "Contact Salesforce Support to schedule performance load.",
//             "c": "Use Bulk API to process jobs in serial mode."
//         },
//         "correctAnswer": "a",
//         "explanation": "For large-scale data migrations, the Bulk API is the recommended tool. To maximize throughput and optimize performance, you should configure the Bulk API jobs to run in parallel mode. This allows Salesforce to process multiple batches from the same job concurrently, significantly speeding up the overall data load time compared to serial mode, which processes one batch at a time.",
//         "multiSelect": false
//     },


//     {
//         "question": "Northern Trail Outfitters (NTO) uses Salesforce to track leads, opportunities, and order details. However, orders are managed by an external (remote) system. Sales reps want to view and update real-time order information in Salesforce. NTO wants the data to only persist in the external system. Which type of integration should an architect recommend?",
//         "answers": {
//             "a": "Data Synchronization",
//             "b": "Data Virtualization",
//             "c": "Process Orchestration"
//         },
//         "correctAnswer": "b",
//         "explanation": "The key requirement is that the data should only persist in the external system, meaning it should not be copied or stored in Salesforce. This is the definition of Data Virtualization. This pattern allows users to view, search, and modify external data in real-time from within the Salesforce UI, but the data itself remains in the external system of record. In Salesforce, this is typically implemented using Salesforce Connect and External Objects.",
//         "multiSelect": false
//     },


//     {
//         "question": "Northern Trail Outfitters (NTO) is planning to create a native employee-facing mobile app with the look and feel of Salesforce Lightning Experience. The mobile app needs to integrate with NTO's Salesforce org. Which Salesforce API should be used to implement this Integration?",
//         "answers": {
//             "a": "Connect REST API",
//             "b": "REST API",
//             "c": "User Interface API"
//         },
//         "correctAnswer": "c",
//         "explanation": "The User Interface API (UI API) is specifically designed for building native mobile apps and custom web apps that need to replicate the Salesforce Lightning Experience. It provides data and metadata in a single response, pre-formatted for display and respecting user visibility settings, layouts, and field-level security. This saves developers from having to make multiple API calls and reimplement Salesforce UI logic, greatly simplifying the development of a consistent user experience.",
//         "multiSelect": false
//     },


//     {
//         "question": "Northern Trail Outfitters has had an increase in requests from other business units to integrate opportunity information with other systems from Salesforce. The developers have started writing asynchronous @future callouts directly into the target systems. The CIO is concerned about the viability of this approach, scaling for future growth, and has requested a solution recommendation. What should be done to mitigate the CIO's concerns?",
//         "answers": {
//             "a": "Implement an Enterprise Service Bus for service orchestration, mediation, routing, and decouple dependencies across systems.",
//             "b": "Refactor the existing @future methods to use Enhanced External Services, import Open API 2.0 schemas, and update flows to use services instead of Apex.",
//             "c": "Implement an extract, transform, load (ETL) tool and perform nightly batch data loads to reduce network traffic using last modified dates on the Opportunity object to extract the right records."
//         },
//         "correctAnswer": "a",
//         "explanation": "The current approach of creating direct, point-to-point integrations is not scalable and leads to a brittle 'spaghetti architecture'. To address the CIO's concerns about scalability and maintainability, the correct architectural pattern is to implement an Enterprise Service Bus (ESB) or a similar middleware platform. An ESB acts as a central integration hub, which decouples Salesforce from the downstream systems. Salesforce sends one message to the ESB, and the ESB handles the complex logic of orchestration, mediation, and routing to all necessary target systems. This creates a flexible and scalable architecture that is much easier to manage and extend.",
//         "multiSelect": false
//     },

//     {
//         "question": "A business-to-consumer (B2C) enterprise customer has a use case that involves processing payment from an external payment gateway service in Salesforce. The Customer Service Representative (CSR) must receive confirmation of payment in real time before proceeding. The integration needs to be reliable and monitored for audit purposes. What should an integration architect recommend?",
//         "answers": {
//             "a": "Use External Services feature to integrate payment gateway to Salesforce to ensure real-time updates to the CSR and support post payment processes.",
//             "b": "Build a custom Apex callout to external payment gateway service and provide a success message to the CSR; the details of callouts and responses are logged for audit purposes.",
//             "c": "Make a callout to the payment gateway through ESB supporting error handling and logging for audit purposes."
//         },
//         "correctAnswer": "c",
//         "explanation": "Integrating with a business-critical transactional system like a payment gateway requires a high degree of reliability, observability, and error handling. The best practice is to route the callout through an Enterprise Service Bus (ESB) or middleware. The ESB can provide robust, centralized capabilities for advanced error handling, sophisticated retry logic, and comprehensive transactional logging for audit purposes. This approach decouples Salesforce from the specific payment gateway and offloads the complex integration concerns to a platform designed to handle them, leading to a more resilient and manageable solution.",
//         "multiSelect": false
//     },

//     {
//         "question": "An integration architect has received a request to prevent employees that leave the company from accessing data in Salesforce after they are deactivated in the company's HR system. What should the integration architect determine before recommending a solution?",
//         "answers": {
//             "a": "Data access prevention requirements, then identify frequency",
//             "b": "Inbound integration requirements, then identify frequency",
//             "c": "Data access prevention requirements, integration requirements, and system constraints"
//         },
//         "correctAnswer": "c",
//         "explanation": "To design a comprehensive solution, the architect must gather a complete set of requirements. This includes: 1) Data access prevention requirements (the 'what' and 'why', e.g., the SLA for user deactivation), 2) Integration requirements (the 'how', e.g., the communication method between the HR system and Salesforce), and 3) System constraints (the capabilities and limitations of both systems, plus any relevant company policies). Understanding all three aspects is crucial for proposing a solution that is both technically feasible and meets the business need.",
//         "multiSelect": false
//     },


//     {
//         "question": "A global financial company has a core banking system that is the master for financial transactions, processing 1 million per day. The CTO is considering building a community portal so that customers can review their bank account details and financial transactions. What should an integration architect recommend as a solution to enable customer community users to view their financial transactions?",
//         "answers": {
//             "a": "Use Iframe to display core banking financial transactions data in the customer community.",
//             "b": "Migrate the financial transaction records to a Salesforce custom object and use an extract, transform, and load (ETL) tool to keep systems in sync.",
//             "c": "Use Salesforce Connect to display the financial transactions as an external object."
//         },
//         "correctAnswer": "c",
//         "explanation": "The extremely high data volume (1 million records/day) makes data synchronization (option B) impractical and cost-prohibitive due to storage limits. The best solution is data virtualization. Salesforce Connect allows you to display the financial transactions as an external object directly in the community. The data remains in the core banking system and is queried in real time, completely avoiding data storage issues in Salesforce. This is the most scalable and efficient pattern for this use case.",
//         "multiSelect": false
//     },


//     {
//         "question": "An integration architect has designed a mobile application for Salesforce users to get data while on the road using a custom user interface (UI). The application is secured with OAuth and is currently functioning well. There is a new requirement where the mobile application needs to obtain the GPS coordinates and store them on a custom geolocation field. The geolocation field is secured with field-level security, so users can view the value without changing it. What should be done to meet the requirement?",
//         "answers": {
//             "a": "The mobile device makes a REST API inbound call.",
//             "b": "The mobile device receives a REST Apex callout call.",
//             "c": "The mobile device makes a REST Apex inbound call."
//         },
//         "correctAnswer": "c",
//         "explanation": "The mobile device needs to send data (GPS coordinates) into Salesforce to update a record. An inbound call to Salesforce is required. Since standard users cannot edit the field due to FLS, a standard REST API update call (A) would fail. The solution is to create a custom Apex REST service (an inbound Apex REST call) that runs in system context (without sharing). This custom endpoint can receive the GPS data from the mobile app and then perform the DML operation to update the geolocation field, bypassing the running user's FLS restrictions.",
//         "multiSelect": false
//     },


//     {
//         "question": "An architect decided to use Platform Events for integrating Salesforce with an external system for a company. What should an architect consider when proposing this type of integration mechanism?",
//         "answers": {
//             "a": "To publish an event, the integration user in Salesforce needs to create permissions on the event entity.",
//             "b": "External system needs to have the same uptime in order to be able to keep up with Salesforce Platform Events.",
//             "c": "Salesforce needs to be able to store information about the external system in order to know which event to send out."
//         },
//         "correctAnswer": "a",
//         "explanation": "Platform Events are first-class sObjects in Salesforce. Just like any other object, access to them is controlled by profiles and permission sets. For an integration user to be able to publish a platform event message, that user's profile or an assigned permission set must have 'Create' permission on the specific Platform Event object. This is a fundamental security and configuration consideration for any Platform Event-based integration.",
//         "multiSelect": false
//     },


//     {
//         "question": "A customer is migrating from an old legacy system to Salesforce. As part of the modernization effort, the customer would like to integrate all existing systems that currently work with its legacy application with Salesforce. Which constraint/pain-point should an integration architect consider when choosing the integration pattern/mechanism?",
//         "answers": {
//             "a": "System types APIs, File systems, Email",
//             "b": "Reporting and usability requirements",
//             "c": "Multi-language and multi-currency requirement"
//         },
//         "correctAnswer": "a",
//         "explanation": "When planning to integrate multiple existing systems, the most fundamental constraint to consider is the technical capability of each of those systems. The architect must identify the types of systems and their available interfaces. Do they have modern APIs? Can they only produce files on a File system? Can they only send or receive Email? The answers to these questions will directly dictate which integration patterns and mechanisms are feasible for each system.",
//         "multiSelect": false
//     },


//     {
//         "question": "A customer's enterprise architect has identified requirements around caching, queuing, error handling, alerts, retries, event handling, etc. The company has asked the integration architect to help fulfill such aspects with its Salesforce program. Which recommendation should the integration architect make?",
//         "answers": {
//             "a": "Message transformation and protocol translation should be done within Salesforce. Recommend leveraging Salesforce native protocol conversion capabilities as middleware tools are NOT suited for such tasks.",
//             "b": "Transform a Fire and Forget mechanism to Request and Reply, which should be handled by middleware tools (like ETL/ESB) to improve performance.",
//             "c": "Provide true message queueing for integration scenarios (including orchestration, process choreography, quality of service, etc.) given that a middleware solution is required."
//         },
//         "correctAnswer": "c",
//         "explanation": "The requirements listed (caching, queuing, advanced error handling, retries, orchestration) are all hallmark features of a middleware solution like an ESB or an integration platform (iPaaS). Salesforce is not designed to handle these complex integration concerns natively. The correct recommendation is to acknowledge that these requirements necessitate a middleware platform, which can provide true message queuing and other quality of service features to build a robust and reliable integration architecture.",
//         "multiSelect": false
//     },


//     {
//         "question": "Northern Trail Outfitters (NTO) wants to improve the quality of callouts from Salesforce to its REST APIs. NTO will require all API clients to adhere to REST API Markup Language (RAML) specifications. Which design specification should the integration architect include to ensure that Apex REST API Clients' unit tests confirm adherence to the RAML specs?",
//         "answers": {
//             "a": "Require the Apex REST API Clients to implement the HttpCalloutMock.",
//             "b": "Call the HttpCalloutMock implementation from the Apex REST API Clients.",
//             "c": "Call the Apex REST API Clients in a test context to get the mock response."
//         },
//         "correctAnswer": "a",
//         "explanation": "To test an Apex class that performs a callout, you must provide a mock response because tests cannot make real callouts. The standard way to do this is by creating a class that implements the HttpCalloutMock interface. This mock class's respond method is responsible for returning a fake HttpResponse. The unit test for the API client would then set this mock implementation before calling the client's method, allowing the test to verify the client's behavior without making a real callout.",
//         "multiSelect": false
//     },
//     {
//         "question": "Northern Trail Outfitters has recently implemented middleware for orchestration. The ERP system requires transactions be captured near real time at a REST endpoint initiated in Salesforce when creating an Order object. Additionally, the Salesforce team has limited development resources and requires a low-code solution. Which option should fulfill the use case requirements?",
//         "answers": {
//             "a": "Use Remote Process Invocation Fire and Forget pattern on insert on the Order object using Flow Builder.",
//             "b": "Implement a Workflow Rule with Outbound Messaging to send SOAP messages to the designated endpoint.",
//             "c": "Implement Change Data Capture on the Order object and leverage the replay ID in the middleware solution."
//         },
//         "correctAnswer": "a",
//         "explanation": "The requirements are: near real-time, initiated on record creation, low-code, and calling a REST endpoint. Flow Builder is Salesforce's primary low-code automation tool. Using a record-triggered flow on the Order object, you can add an 'Action' element to make an HTTP callout to the REST endpoint. This directly implements the Remote Process Invocation—Fire and Forget pattern declaratively. Outbound Messaging (B) is SOAP-only. Change Data Capture (C) is asynchronous and relies on the external system to subscribe and pull, which is a different pattern.",
//         "multiSelect": false
//     },


//     {
//         "question": "Universal Containers (UC) is currently managing a custom monolithic web service that runs on an on-premise server, responsible for Point-to-Point (P2P) integrations between Salesforce and three other systems. UC has found that the tight interdependencies are causing integrations to fail. What should an architect recommend to decouple the systems and improve performance?",
//         "answers": {
//             "a": "Use the Salesforce Bulk API when integrating back into Salesforce.",
//             "b": "Move the custom monolithic web service from on-premise to a cloud provider.",
//             "c": "Leverage modular design by breaking up the web service into smaller pieces for a microservice architecture."
//         },
//         "correctAnswer": "c",
//         "explanation": "The core problem is the 'monolithic' nature of the service and the 'tight interdependencies' it creates. The standard architectural solution for this is to move towards a microservices architecture. This involves breaking up the single, large monolithic service into a collection of smaller, independent, and modular services. Each microservice would be responsible for a single business capability (e.g., one for the billing integration, one for the ERP). This approach effectively decouples the systems, allowing them to be developed, deployed, and scaled independently, which greatly improves resilience and overall performance.",
//         "multiSelect": false
//     },


//     {
//         "question": "A customer is evaluating the Platform Events solution and would like help in comparing/contrasting it with Outbound Messaging for real-time/near-real time needs. What should be evaluated and highlighted when deciding between the solutions?",
//         "answers": {
//             "a": "In both Platform Events and Outbound Messaging, the event messages are retried by and delivered in sequence, and only once.",
//             "b": "Message sequence is possible in Outbound Messaging, but not guaranteed with Platform Events. Both offer very high reliability.",
//             "c": "Both Platform Events and Outbound Messaging are highly scalable. However, unlike Outbound Messaging, only Platform Events have Event Delivery and Event Publishing limits to be considered."
//         },
//         "correctAnswer": "b",
//         "explanation": "This question tests the key differences between the two technologies. Outbound Messaging sends messages in the order they are generated and retries until a positive acknowledgement is received, making it highly reliable and sequential. Platform Events are also highly reliable (with a 72-hour replay window), but message ordering is not guaranteed across different publishers or in certain high-volume scenarios. This difference in sequencing guarantees is a critical factor when choosing between them.",
//         "multiSelect": false
//     },


//     {
//         "question": "Northern Trail Outfitters is creating a distributable Salesforce package. The package needs to call into a custom Apex REST endpoint in a central org. The security team wants to ensure a specific integration account is used, authorized after installation. Which item should an architect recommend to secure the integration in the package?",
//         "answers": {
//             "a": "Contact Salesforce Support and create a case to temporarily enable API access for managed packages.",
//             "b": "Use an encrypted field to store the password that the security team enters, and use password management for external orgs and set the encryption method to TLS 1.2.",
//             "c": "Create an authentication provider in the package and set the consumer key and consumer secret of the connected app in the central org."
//         },
//         "correctAnswer": "c",
//         "explanation": "This is a complex scenario but the most secure and standard way to handle authentication from a package to a central service is using OAuth. The package can include a pre-configured Authentication Provider. After installation in a subscriber org, an administrator would complete the setup by entering the Consumer Key and Consumer Secret from a Connected App that was manually created in the central org for that specific subscriber. This allows the package to securely obtain an OAuth token on behalf of the subscriber org to make authenticated callouts, without ever storing usernames or passwords.",
//         "multiSelect": false
//     },


//     {
//         "question": "A company uses a Customer Community for students to register and pay for courses. The payment gateway takes more than 30 seconds to process the transaction. Students want to get the payment result in real time so they can retry if an error occurs. What is the recommended integration approach?",
//         "answers": {
//             "a": "Use Platform Events to process payment to the payment gateway.",
//             "b": "Use Request and Reply to make an API call to the payment gateway.",
//             "c": "Use Continuation to process payment to the payment gateway."
//         },
//         "correctAnswer": "c",
//         "explanation": "This is the classic use case for the Continuation framework. A standard synchronous Apex callout from a Visualforce page or Aura component would time out. The Continuation object allows you to make a long-running callout (up to 60 seconds) from a UI controller. It works by handing off the request to the App Server, freeing up the web server, and then processing a callback method when the response is received. This provides a seamless, real-time experience for the user without hitting Apex CPU or callout limits for long-running requests initiated from a UI.",
//         "multiSelect": false
//     },


//     {
//         "question": "Support agents in Service Cloud open bank accounts for customers. The core banking system is the system of record and must generate the bank account ID. All accounts opened in Salesforce must be synced in real time to the core banking system, and the agent needs to receive the new ID to give to the customer. Which integration pattern is recommended?",
//         "answers": {
//             "a": "Salesforce platform event",
//             "b": "Streaming API to generate Push Topic",
//             "c": "Request and Reply"
//         },
//         "correctAnswer": "c",
//         "explanation": "The key requirement is that the support agent needs an immediate response (the new bank account ID) from the external system within the same transaction. This necessitates a synchronous integration pattern. The Request and Reply pattern is the correct choice. In this pattern, Salesforce makes a synchronous callout (the 'Request') to the core banking system and waits for an immediate response (the 'Reply') containing the new account ID before the agent can proceed.",
//         "multiSelect": false
//     },


//     {
//         "question": "When a user clicks 'Check Preferences' in a Lightning flow, preferences from an externally hosted RESTful service are to be checked in real time. The service has an OpenAPI 2.0 JSON definition. Which integration pattern and mechanism should be selected?",
//         "answers": {
//             "a": "Data Virtualization: Salesforce Connect maps external REST data in external objects.",
//             "b": "Request and Reply: Enhanced External Services invokes a REST API.",
//             "c": "Remote Call-In: Salesforce REST API with REST Composite Resources."
//         },
//         "correctAnswer": "b",
//         "explanation": "The requirements are: called from a Flow, real-time, and a REST service with an OpenAPI definition. This is the perfect use case for Enhanced External Services. This feature allows you to declaratively register an external service by providing its OpenAPI (Swagger) specification. Salesforce then automatically generates Apex wrapper classes and invocable actions. These actions can be easily called directly from a Flow, implementing the synchronous Request and Reply pattern with no code required.",
//         "multiSelect": false
//     },


//     {
//         "question": "A large B2C customer is implementing Salesforce to get a 360-degree view of the customer and leverage Salesforce for marketing, sales, and service. They want to reuse existing enterprise capabilities for quoting and order management. Based on the diagram and goals, which three systems can be retired?",
//         "answers": {
//             "a": "Email Marketing, Sales Activity, and Case Management",
//             "b": "Sales Activity, Order Management, and Case Management",
//             "c": "Order Management, Case Management, and Email Marketing"
//         },
//         "correctAnswer": "a",
//         "explanation": "The goals state they will leverage Salesforce for marketing, sales, and service processes. This directly implies that the existing systems for these functions can be retired. Therefore, the Email Marketing System (replaced by Marketing Cloud/Pardot), the Sales Activity System (replaced by Sales Cloud), and the Case Management System (replaced by Service Cloud) are the candidates for retirement. The goals also state they will reuse quoting and order management, so those systems will remain.",
//         "multiSelect": false
//     },


//     {
//         "question": "Northern Trail Outfitters' new Corporate Security Guidelines require that all cloud applications pass through a secure firewall before accessing on-premise resources. NTO is evaluating middleware solutions to integrate cloud applications with on-premise resources. Which consideration should an integration architect evaluate before choosing a middleware solution?",
//         "answers": {
//             "a": "An API Gateway component is deployable behind a Demilitarized Zone (DMZ) or perimeter network.",
//             "b": "The middleware solution is able to interface directly with databases via an Open Database Connectivity (ODBC) connection string.",
//             "c": "The middleware solution enforces the OAuth security protocol."
//         },
//         "correctAnswer": "a",
//         "explanation": "A Demilitarized Zone (DMZ) is a perimeter network that protects an organization's internal local-area network (LAN) from untrusted traffic. A common security architecture is to place an API Gateway within the DMZ. This gateway acts as a secure, controlled entry point for all incoming traffic from the cloud (like Salesforce) before it is allowed to access any internal, on-premise resources. Therefore, a critical evaluation criterion for a middleware solution is whether it has a gateway component that can be deployed in this manner.",
//         "multiSelect": false
//     },


//     {
//         "question": "A company needs to send data from Salesforce to a homegrown system behind a corporate firewall. The data needs to be pushed only one way and doesn't need to be in real time. The average volume is 2 million records per day. What should an architect consider when choosing the right option?",
//         "answers": {
//             "a": "Due to high volume of records, number of concurrent requests can hit the limit for the REST API call to the external system.",
//             "b": "Due to high volume of records, the external system will need to use a BULK API Rest endpoint to connect to Salesforce.",
//             "c": "Due to high volume of records, a third-party integration tool is required to stage records off platform."
//         },
//         "correctAnswer": "c",
//         "explanation": "Pushing 2 million records per day directly from Salesforce using Apex callouts is not a scalable or reliable solution. You would quickly hit governor limits, such as the daily API callout limit and concurrent request limits. The best practice for such high-volume, one-way data exports is to use a third-party integration tool (ETL/iPaaS). This tool can query the records from Salesforce (using the Bulk API for efficiency), stage them off-platform, and then handle the process of pushing them into the on-premise system, managing batching, error handling, and retries without consuming Salesforce's limited transactional resources.",
//         "multiSelect": false
//     },


//     {
//         "question": "Salesforce is the system of record for customer data, but this data also exists in an ERP, ticketing system, and data lake, each with its own unique identifier. UC plans on using middleware to integrate the systems and needs to update the proper external system when a Salesforce record changes and vice versa. Which solution should an architect recommend?",
//         "answers": {
//             "a": "Design an MDM solution that maps external IDs to the Salesforce record ID.",
//             "b": "Use Change Data Capture to update downstream systems accordingly when a record changes.",
//             "c": "Locally cache external IDs at the middleware layer and design business logic to map updates between systems."
//         },
//         "correctAnswer": "a",
//         "explanation": "This is a classic Master Data Management (MDM) problem. To reliably synchronize a single customer entity across multiple systems, you need a way to correlate the different system IDs. The best practice is to design an MDM solution. In the Salesforce context, this often means creating a custom object (e.g., 'System ID Cross-Reference') that maps the Salesforce record ID to the corresponding unique identifiers from the ERP, ticketing system, and data lake. This cross-reference table allows the middleware to accurately identify which record to update in which system, regardless of where the change originated.",
//         "multiSelect": false
//     },


//     {
//         "question": "The URL for an external service has been changed without prior notice. The service provides up-to-date money exchange rates that are accessed several times from Salesforce and are a business-critical function. Which solutions should an integration architect recommend be implemented to minimize potential downtime for users in this situation?",
//         "answers": {
//             "a": "Remote Site Settings and Named Credentials",
//             "b": "Enterprise Service Bus (ESB) and Remote Site Settings",
//             "c": "Named Credentials and Content Security Policies"
//         },
//         "correctAnswer": "a",
//         "explanation": "The problem is a hardcoded endpoint URL that is difficult to change quickly. Named Credentials solve this by abstracting the endpoint URL and authentication details away from the Apex code. If the URL changes, an administrator can simply update the URL field on the Named Credential record in Setup, and all callouts using it will instantly point to the new location without any code deployment. Remote Site Settings are also required for the callout to be permitted by Salesforce, so both are necessary components of a maintainable callout solution.",
//         "multiSelect": false
//     },
//     // Question 1
//     {
//         "question": "A developer has been tasked by the integration architect to build a solution based on the Streaming API. The developer has done some research and has found there are different implementations of the events in Salesforce (Push Topic Events, Change Data Capture, Generic Streaming, Platform Events), but is unsure of how to proceed with the implementation and asks the system architect for some guidance. What should the architect consider when making the recommendation?",
//         "answers": {
//             "a": "PushTopic events can define a custom payload.",
//             "b": "Change Data Capture can be published from Apex.",
//             "c": "Change Data Capture does not have record access support."
//         },
//         "correctAnswer": "c",
//         "explanation": "This question's provided options are all factually incorrect, which can occur in exam dumps. However, if forced to choose the 'best' or intended answer, the differences in payload are a key consideration. Platform Events allow a fully custom payload, whereas Change Data Capture (CDC) and PushTopics have predefined schemas based on the sObject. Option (c) is incorrect as CDC does respect record access controls. Option (b) is incorrect as CDC events are published by the platform, not Apex. Option (a) is incorrect as PushTopic payloads are defined by a SOQL query, not custom-defined. The most significant differentiator when choosing a streaming technology is often the payload structure, making Platform Events suitable for custom, event-driven architectures.",
//         "multiSelect": false
//     },
//     // Question 2
//     {
//         "question": "Northern Trail Outfitters has recently implemented middleware for orchestration of services across platforms. The Enterprise Resource Planning (ERP) system being used requires transactions be captured near real time at a REST endpoint initiated in Salesforce when creating an Order object. Additionally, the Salesforce team has limited development resources and requires a low-code solution. Which option should fulfill the use case requirements?",
//         "answers": {
//             "a": "Use Lightning Flow to create a platform event, selecting the record type as the platform event.",
//             "b": "Implement Change Data Capture on the Order object and leverage the replay ID in the middleware solution.",
//             "c": "Implement a Workflow Rule with Outbound Messaging to send SOAP messages to the designated endpoint."
//         },
//         "correctAnswer": "a",
//         "explanation": "The key requirements are 'near real time', 'low-code', and initiating a process. Lightning Flow is a low-code tool that can be triggered when an Order is created. From the Flow, a Platform Event can be published. A middleware client can then subscribe to this event and make the necessary call to the ERP's REST endpoint. This approach is declarative, meets the near real-time requirement, and decouples Salesforce from the middleware.",
//         "multiSelect": false
//     },
//     // Question 3
//     {
//         "question": "Northern Trail Outfitters (NTO) uses different shipping services for each of the 34 countries it serves. Services are added and removed frequently to optimize shipping times and costs. Sales representatives serve all NTO customers globally and need to select between valid service(s) for the customer's country and request shipping estimates from that service. Which solution should an architect propose?",
//         "answers": {
//             "a": "Store shipping services in a picklist that is dependent on a country picklist.",
//             "b": "Use middleware to abstract the call to the specific shipping services.",
//             "c": "Use Platform Events to construct and publish shipper specific events."
//         },
//         "correctAnswer": "b",
//         "explanation": "The shipping services change frequently and have complex logic (per-country availability). Managing this logic within Salesforce would be difficult and require constant updates. A middleware layer provides an abstraction (a facade). Salesforce makes a single, simple call to the middleware (e.g., 'get shipping estimate for this country'), and the middleware handles the complex, volatile logic of determining the correct service and routing the request. This keeps the Salesforce implementation clean and shifts the complexity to a more suitable system.",
//         "multiSelect": false
//     },
//     // Question 4
//     {
//         "question": "Universal Containers (UC) is a global financial company. UC support agents would like to open bank accounts on the spot for customers who inquire about UC products. During the bank account opening process, the agents execute credit checks for the customers through external agencies. At any given time, up to 30 concurrent reps will be using the service to perform credit checks for customers. Which error handling mechanisms should be built to display an error to the agent when the credit verification process has failed?",
//         "answers": {
//             "a": "Handle errors in the middleware; in case the verification process is down, then the middleware should retry processing the request multiple times.",
//             "b": "In case the verification process is down, use a mock service to send the response to the agent.",
//             "c": "In case the verification process is down, use a fire and forget mechanism instead of Request and Reply to allow the agent to get the response back when the service is back online."
//         },
//         "correctAnswer": "a",
//         "explanation": "The agent needs feedback if the process fails. A robust error handling strategy involves the middleware attempting to recover from transient failures by retrying the request. If the retries ultimately fail, the middleware should return a specific error message to the calling system (Salesforce), which can then be displayed to the agent in the UI. This provides both resilience (retries) and user feedback.",
//         "multiSelect": false
//     },
//     // Question 5
//     {
//         "question": "Service agents at Northern Trail Outfitters use Salesforce to manage cases and B2C Commerce for ordering. Which integration solution should an architect recommend in order for the service agents to see order history from a business-to-consumer (B2C) Commerce system?",
//         "answers": {
//             "a": "REST API led by Commerce Platform",
//             "b": "Salesforce B2C Commerce to Service Cloud Connector",
//             "c": "Mulesoft Anypoint Platform"
//         },
//         "correctAnswer": "b",
//         "explanation": "When a pre-built, supported connector exists for a specific use case between two Salesforce products, it is almost always the best recommendation. The 'Salesforce B2C Commerce to Service Cloud Connector' is designed precisely for this purpose, providing a streamlined way to surface commerce data within the service console with minimal custom development.",
//         "multiSelect": false
//     },
//     // Question 6
//     {
//         "question": "Universal Containers (UC) currently owns a middleware tool and has developed an API-led integration architecture with three API tiers: The first tier interfaces directly with the systems of engagement. The second tier implements business logic and aggregates data. The third tier Interfaces directly with the systems of record. Some of the systems of engagement will be a mobile application, a web application, and Salesforce. UC has a business requirement to return data to the systems of engagement in different formats while also enforcing different security protocols. What should an integration architect recommend to meet these requirements?",
//         "answers": {
//             "a": "Enforce separate security protocols and return formats at the first tier of the API-led architecture.",
//             "b": "Leverage an Identity Provider solution that communicates with the tiers via SAML.",
//             "c": "Implement an API Gateway that all systems of engagement must interface with first."
//         },
//         "correctAnswer": "a",
//         "explanation": "In a three-tier API-led architecture, the first tier is the 'Experience Layer'. The primary purpose of this layer is to provide tailored APIs for specific front-end applications or 'systems of engagement'. This includes formatting the data exactly as the client needs it and applying security policies appropriate for that specific channel. Therefore, handling format transformations and security enforcement at this first tier is the correct design pattern.",
//         "multiSelect": false
//     },
//     // Question 7
//     {
//         "question": "A customer's enterprise architect has identified requirements around caching, queuing, error handling, alerts, retries, event handling, etc. The company has asked the Integration architect to help fulfill such aspects with its Salesforce program. Which recommendation should the integration architect make?",
//         "answers": {
//             "a": "Transform a Fire and Forget mechanism to Request and Reply, which should be handled by middleware tools (like ETL/ESB) to improve reliability.",
//             "b": "Message transformation and protocol translation should be done within Salesforce. Recommend leveraging Salesforce native protocol conversion capabilities as middleware tools are NOT suited for such tasks.",
//             "c": "Event handling in a publish/subscribe scenario, the middleware can be used to route requests or messages to active data-event subscribers from active data-event publishers."
//         },
//         "correctAnswer": "c",
//         "explanation": "The listed requirements (caching, queuing, retries, complex event handling) are all hallmark features of a dedicated middleware platform or Enterprise Service Bus (ESB). While Salesforce has some of these capabilities, they are not as robust or scalable as a purpose-built middleware tool. Option C correctly describes a typical function of middleware in managing a pub/sub model, which aligns with the advanced event handling requirements.",
//         "multiSelect": false
//     },
//     // Question 8
//     {
//         "question": "Northern Trail Outfitters needs to use Shield Platform Encryption to encrypt social security numbers in order to meet a business requirement. Which action should an integration architect take prior to the implementation of Shield Platform Encryption?",
//         "answers": {
//             "a": "Encrypt the state using the most secure method.",
//             "b": "Analyze the impact of encryption on integrations and SOQL filter/sort functionality.",
//             "c": "Encrypt all the data so that it is secure.",
//             "d": "Use Shield Platform Encryption as a user authentication or authorization tool."
//         },
//         "correctAnswer": "b",
//         "explanation": "Before implementing Shield Platform Encryption, it's crucial to perform a thorough impact analysis. Encrypting fields can break existing functionality, particularly SOQL queries that filter or sort on the encrypted field, as well as integrations that expect to send or receive plaintext data. An architect must identify all downstream impacts to avoid breaking the application.",
//         "multiSelect": false
//     },
//     // Question 9
//     {
//         "question": "Northern Trail Outfitters (NTO) has an affiliate company that would like immediate notifications of changes to opportunities in the NTO Salesforce instance. The affiliate company has a CometD client available. Which solution is recommended in order to meet the requirement?",
//         "answers": {
//             "a": "Create a PushTopic update event on the Opportunity object to allow the subscriber to react to the streaming API.",
//             "b": "Create a connected app in the affiliate org and select 'Accept CometD Client Requests'.",
//             "c": "Implement a polling mechanism in the client that calls the SOAP API getUpdated() method to get the ID values of each updated record."
//         },
//         "correctAnswer": "a",
//         "explanation": "The requirements are 'immediate notifications' and a 'CometD client'. CometD is the messaging protocol used by Salesforce's Streaming API. PushTopics are a feature of the Streaming API that allows clients to subscribe to notifications for record changes that match a specific SOQL query. Creating a PushTopic on the Opportunity object is the direct, intended solution for this scenario.",
//         "multiSelect": false
//     },
//     // Question 10
//     {
//         "question": "A large enterprise customer has decided to implement Salesforce as its CRM. The current system landscape includes: 1. An Enterprise Resource Planning (ERP) solution that is responsible for Customer invoicing and order fulfillment. 2. A Marketing solution used for email campaigns. The enterprise customer needs its sales and service associates to use Salesforce to view and log their interactions with customers and prospects in Salesforce. Which system should be the system of record for the enterprise customer's customers and prospects?",
//         "answers": {
//             "a": "Custom Database for customers and prospects.",
//             "b": "ERP with all prospect data from Marketing and Salesforce.",
//             "c": "Salesforce with relevant Marketing and ERP information."
//         },
//         "correctAnswer": "c",
//         "explanation": "Since Salesforce is being implemented as the CRM (Customer Relationship Management) system, it should be the central hub and authoritative source for customer and prospect data. This means it becomes the System of Record (SOR) for this data. Relevant information from other systems, like order history from the ERP or campaign history from the marketing tool, should be synchronized or surfaced within Salesforce to create a comprehensive 360-degree view of the customer.",
//         "multiSelect": false
//     },
//     // Question 11
//     {
//         "question": "A global financial company has a core banking system that processes 1 million financial transactions per day. The CTO is considering building a community portal so that customers can review their financial transactions. What should an integration architect recommend as a solution to enable customer community users to view their financial transactions?",
//         "answers": {
//             "a": "Migrate all financial transaction records to a Salesforce custom object and use an extract, transform, and load (ETL) tool to keep systems in sync.",
//             "b": "Use Salesforce Connect to display the financial transactions as an external object.",
//             "c": "Use an iframe to display core banking financial transactions data in the customer community."
//         },
//         "correctAnswer": "b",
//         "explanation": "Storing 1 million new records per day in Salesforce is not feasible due to data storage costs and limits. Salesforce Connect is the ideal solution for this 'data virtualization' use case. It allows Salesforce to query and display data from an external system in real-time as 'external objects' without physically storing the large volume of data within Salesforce. This provides seamless access for community users while respecting the external system as the system of record.",
//         "multiSelect": false
//     },
//     // Question 12
//     {
//         "question": "Northern Trail Outfitters has a registration system for workshops. It is expected that there will be a big surge of requests for workshop reservations when the conference schedule goes live. Which integration pattern should be used to manage the influx in registrations?",
//         "answers": {
//             "a": "Remote Process Invocation - Fire and Forget",
//             "b": "Batch Data Synchronization",
//             "c": "Remote Process Invocation - Request and Reply"
//         },
//         "correctAnswer": "a",
//         "explanation": "A large surge of requests can overwhelm a system that tries to process each one synchronously (Request and Reply). The Fire and Forget pattern is designed for this. The Salesforce community can quickly accept the registration request and pass it to an asynchronous processing queue (e.g., by publishing a Platform Event). The backend scheduling system can then process these requests from the queue at its own pace. This makes the user interface responsive and protects the backend from being overloaded.",
//         "multiSelect": false
//     },
//     // Question 13
//     {
//         "question": "A business requires automating the check and updating of the phone number type classification for up to 100,000 incoming calls per day. A middleware hosted on customer premise will call into Salesforce to update the records. In order to implement these patterns and mechanisms, which component should an integration architect recommend?",
//         "answers": {
//             "a": "Connected App configured in Salesforce to authenticate the middleware.",
//             "b": "Remote Site Settings configured in Salesforce to authenticate the middleware.",
//             "c": "An API Gateway that authenticates requests from Salesforce into the middleware (ETL/ESB)."
//         },
//         "correctAnswer": "a",
//         "explanation": "The scenario describes a 'Remote-Call-In' pattern, where an external system (the middleware) is calling *into* Salesforce. To allow an external application to securely authenticate and access Salesforce APIs, a Connected App must be configured in Salesforce. The Connected App acts as the entry point, managing authentication (typically via OAuth 2.0) and authorization for the external client.",
//         "multiSelect": false
//     },
//     // Question 14
//     {
//         "question": "An enterprise architect has requested the Salesforce integration architect to review the following: About 3,000 phone sales agents use a Salesforce Lightning user interface (UI) concurrently to check eligibility of a customer for a qualifying offer. There are multiple eligibility systems hosted externally that could take up to 90 seconds to process and return. All requests from Salesforce will have to traverse through the customer's API Gateway layer, and the API Gateway imposes a constraint of timing out requests after 9 seconds. Which recommendation should the integration architect make?",
//         "answers": {
//             "a": "Create a platform event in Salesforce via Remote Call-In and use the empApi in the Lightning UI to serve 3,000 concurrent users when responses are received by MuleSoft.",
//             "b": "Use Continuation callouts to make the eligibility check request from Salesforce Lightning UI at page load.",
//             "c": "Recommend a synchronous call from the Lightning UI to External Systems via MuleSoft and implement polling from the API Gateway."
//         },
//         "correctAnswer": "a",
//         "explanation": "This is a classic long-running callout problem that requires an asynchronous approach. A direct call will time out. The correct pattern is: 1. The Lightning UI initiates the request (fire-and-forget). 2. Middleware receives the request and processes the long-running (90-second) call to the external system. 3. When the middleware gets the response, it calls back into Salesforce (remote call-in) and publishes a Platform Event. 4. The original Lightning UI, having subscribed to a channel using the `empApi` component, receives the event and displays the result to the agent. This decouples the UI from the long-running process and provides a non-blocking user experience.",
//         "multiSelect": false
//     },
//     // Question 15
//     {
//         "question": "Northern Trail Outfitters uses a custom Java application to display code coverage and test results for all of its enterprise applications and plans to include Salesforce as well. Which Salesforce API should an integration architect use to meet the requirement?",
//         "answers": {
//             "a": "Tooling API",
//             "b": "Metadata API",
//             "c": "Analytics REST API"
//         },
//         "correctAnswer": "a",
//         "explanation": "The Tooling API is specifically designed for building development tools and IDEs for the Salesforce platform. It provides access to development artifacts like Apex classes and triggers, as well as metadata about their execution, such as code coverage statistics and test results. This is the correct API for building a custom application to monitor developer-centric metrics.",
//         "multiSelect": false
//     },
//     // Question 16
//     {
//         "question": "A business-to-consumer (B2C) enterprise customer has a use case that involves processing payment from an external payment gateway service in Salesforce. A CSR submits payment information in Salesforce, receives confirmation of payment, and then upgrades the service for the customer. This use case requires the CSR to obtain confirmation of payment before upgrading the service. The integration needs to be reliable and monitored. What should an integration architect recommend?",
//         "answers": {
//             "a": "Use the Request-Reply pattern implemented with an Apex callout to the external RESTful service.",
//             "b": "Use the Fire-and-Forget pattern by publishing a Platform Event.",
//             "c": "Use Batch Data Synchronization to send payments to the gateway overnight.",
//             "d": "Use Outbound Messaging to send a SOAP request to the payment gateway."
//         },
//         "correctAnswer": "a",
//         "explanation": "The key requirement is that the CSR must wait for a synchronous confirmation ('obtains confirmation') before proceeding. This dictates a Request and Reply pattern. Since the external service is RESTful, the standard implementation in Salesforce is to make an Apex callout from the user interface's controller. This callout will wait for the response from the payment gateway and return the success or failure message to the CSR.",
//         "multiSelect": false
//     },
//     // Question 17
//     {
//         "question": "An integration architect has designed a mobile application for Salesforce users to get data while on the road using a custom user interface (UI). The application is secured with OAuth and is currently functioning well. There is a new requirement where the mobile application needs to obtain the GPS coordinates and store them on a custom geolocation field. The geolocation field is secured with field-level security, so users can view the value without changing it. What should be done to meet the requirement?",
//         "answers": {
//             "a": "The mobile device makes a REST Apex inbound call.",
//             "b": "The mobile device receives a REST Apex callout call.",
//             "c": "The mobile device makes a REST API inbound call."
//         },
//         "correctAnswer": "a",
//         "explanation": "The crucial constraint is that the user does not have edit permission on the target field due to Field-Level Security (FLS). A standard inbound REST API call (Option C) runs in the user's context and would therefore fail. A custom Apex REST service (annotated with `@RestResource`), however, runs in system mode by default. This allows the Apex code to bypass the running user's FLS and successfully write the value to the otherwise read-only field.",
//         "multiSelect": false
//     },
//     // Question 18
//     {
//         "question": "At Northern Trail Outfitters, when an opportunity has changed its status to 'Closed/Won' and there are products attached, the details should be passed to the OMS for fulfillment operations. The callout from Salesforce to the OMS should be synchronous. What should an integration architect do to satisfy these requirements?",
//         "answers": {
//             "a": "A Lightning component that makes a synchronous Apex REST callout to the OMS when a button is clicked.",
//             "b": "Develop a batch Apex job that aggregates closed opportunities and makes REST calls to the OMS daily.",
//             "c": "A trigger that invokes an Apex proxy class to make a REST call to the OMS."
//         },
//         "correctAnswer": "c",
//         "explanation": "The process must be automated based on a record change (status update), which points to an Apex trigger as the initiator. While you cannot perform a direct synchronous DML-then-callout from a trigger, the standard pattern to handle this is for the trigger to invoke an asynchronous method (like `@future` or Queueable Apex) to perform the callout. Given the options, the trigger is the correct starting point for the automation. The explicit 'synchronous' requirement in the question might be slightly flawed, but the trigger-initiated callout is the best architectural choice.",
//         "multiSelect": false
//     },
//     // Question 19
//     {
//         "question": "A company's cloud-based single page application consolidates data from multiple systems. The diagram typifies the application's combined use of synchronous and asynchronous calls. To measure performance, every call start (A) and finish (H) date and time is logged. Which computation represents the end-to-end response time from the user's perspective?",
//         "answers": {
//             "a": "Sum of A to H",
//             "b": "H - A",
//             "c": "Sum of A, C, and D"
//         },
//         "correctAnswer": "b",
//         "explanation": "End-to-end response time, from a user's perspective, is the total elapsed time from when they initiate a request until the final result is presented to them. In the provided diagram, 'A' represents the start of the user's request, and 'H' represents the moment the final, consolidated response is delivered. Therefore, the total perceived wait time is the difference between these two points in time: H minus A.",
//         "multiSelect": false
//     },
//     // Question 20
//     {
//         "question": "A customer imports data from an external system into Salesforce using Bulk API. These jobs have batch sizes of 2,000 and are run in parallel mode. The batches fail frequently with the error 'Max CPU time exceeded'. A smaller batch size will fix this error. What should be considered when using a smaller batch size?",
//         "answers": {
//             "a": "Smaller batch size may exceed the concurrent API request limits.",
//             "b": "Smaller batch size may increase time required to execute Bulk jobs.",
//             "c": "Smaller batch size can trigger 'Too many concurrent batches' error."
//         },
//         "correctAnswer": "b",
//         "explanation": "The 'Max CPU time exceeded' error occurs because complex triggers or automation are firing on the inserted/updated records, and they take too long to run for a batch of 2,000. Reducing the batch size (e.g., to 200) reduces the number of records processed in a single transaction, keeping it under the CPU limit. However, the trade-off is that the total job will be split into many more batches. The overhead of queuing and processing each individual batch will increase the total time required to complete the entire data load.",
//         "multiSelect": false
//     },
//     // Question 21
//     {
//         "question": "Northern Trail Outfitters (NTO) has a requirement to encrypt a few widely used standard fields. NTO also wants to be able to use these fields in record-triggered flows. Which security solution should an integration architect recommend to fulfill the business use case?",
//         "answers": {
//             "a": "Shield Platform Encryption",
//             "b": "Data Masking",
//             "c": "Classic Encryption"
//         },
//         "correctAnswer": "a",
//         "explanation": "Shield Platform Encryption is Salesforce's premium encryption-at-rest offering. Unlike Classic Encryption, it supports encrypting a wider range of standard fields and, crucially, allows many of those encrypted fields to be used in automation like record-triggered flows, validation rules, and Apex. Data Masking is a feature for anonymizing data in sandboxes and is not an encryption solution for production.",
//         "multiSelect": false
//     },

//     // Question 22
//     {
//         "question": "Northern Trail Outfitters is in the final stages of merging two Salesforce orgs, but needs to keep the retiring org available for a short period of time for lead management as it is connected to multiple public website forms. The sales department has requested that new leads are available in the new Salesforce Instance within 30 minutes. Which approach requires the least amount of development effort?",
//         "answers": {
//             "a": "Salesforce to Salesforce",
//             "b": "REST API and middleware",
//             "c": "Outbound Messaging"
//         },
//         "correctAnswer": "a",
//         "explanation": "Salesforce to Salesforce is a native, declarative feature for sharing records between Salesforce orgs. It can be configured with point-and-click tools to automatically synchronize records that meet certain criteria, such as new leads. This requires significantly less development effort than building a custom API integration with middleware or setting up an Outbound Messaging listener.",
//         "multiSelect": false
//     },
//     // Question 23
//     {
//         "question": "A customer of Salesforce has used Platform Events to integrate their Salesforce instance with an external third-party artificial intelligence (AI) system. The trigger on the Platform Events has failed ever since it was rolled out to production. Which type of monitoring should the integration consultant have considered to monitor this integration?",
//         "answers": {
//             "a": "Validate that the Platform Event definition matches the lead's definition.",
//             "b": "Monitor Platform Event creation per hour limits across the Salesforce instance.",
//             "c": "Set debug logs for Platform Event triggers to monitor performance."
//         },
//         "correctAnswer": "c",
//         "explanation": "When an Apex trigger, including one for Platform Events, fails in production, the primary diagnostic tool is the debug log. By setting up debug logs for the Automated Process user (which executes asynchronous triggers), a developer can capture the detailed execution flow, variable states, and, most importantly, the unhandled exception that is causing the trigger to fail. This is essential for troubleshooting.",
//         "multiSelect": false
//     },
//     // Question 24
//     {
//         "question": "An integration architect has been tasked with integrating Salesforce with an on-premises system. Due to some established policies, this system must remain on-premises. What should the integration architect use to build a solution for this requirement?",
//         "answers": {
//             "a": "Use Salesforce Connect if the database supports Open Data Protocol (OData).",
//             "b": "Use Salesforce Connect if the database supports Open Database Connectivity (ODBC).",
//             "c": "Use Heroku Connect if the data is hosted in Heroku."
//         },
//         "correctAnswer": "a",
//         "explanation": "Salesforce Connect allows Salesforce to access and display data from external systems in real time without storing it. It achieves this using external data source adapters. The most common and standard adapter is for the OData protocol. If the on-premises system can expose its data via a secure OData endpoint, Salesforce Connect can be used to integrate it. Salesforce does not have a native ODBC adapter.",
//         "multiSelect": false
//     },
//     // Question 25
//     {
//         "question": "Northern Trail Outfitters (NTO) has recently changed its Corporate Security Guidelines. The guidelines require that all cloud applications pass through a secure firewall before accessing on-premise resources. NTO is evaluating middleware solutions to integrate cloud applications with on-premise resources and services. Which consideration should an integration architect evaluate before choosing a middleware solution?",
//         "answers": {
//             "a": "The middleware solution is capable of establishing a secure API Gateway between cloud applications and on-premise resources.",
//             "b": "The middleware solution enforces the OAuth security protocol.",
//             "c": "The middleware solution is able to interface directly with databases via an Open Database Connectivity (ODBC) connection string."
//         },
//         "correctAnswer": "a",
//         "explanation": "The core requirement is to securely manage traffic from the cloud (Salesforce) through a firewall to on-premise systems. An API Gateway is a standard architectural component for this purpose. It acts as a secure reverse proxy, enforcing security policies, managing traffic, and routing requests. A middleware solution that includes or can act as an API Gateway is best suited to meet these security and architectural needs.",
//         "multiSelect": false
//     },
//     // Question 26
//     {
//         "question": "What is the first thing an integration architect should validate if a callout from a Lightning web component to an external endpoint is failing?",
//         "answers": {
//             "a": "The endpoint URL has been added to Content Security Policies.",
//             "b": "The endpoint URL has been added to Remote Site Settings.",
//             "c": "The domain has been added to Cross-Origin Resource Sharing (CORS)."
//         },
//         "correctAnswer": "c",
//         "explanation": "Callouts made directly from client-side JavaScript in a Lightning Web Component (LWC) are subject to the browser's same-origin policy. For a script running on a Salesforce domain to make a request to an external domain, that external domain's server must explicitly permit it by including the Salesforce origin in its Cross-Origin Resource Sharing (CORS) policy response headers. A missing or incorrect CORS configuration is the most common reason for such callouts to fail.",
//         "multiSelect": false
//     },
//     // Question 27
//     {
//         "question": "Universal Containers (UC) has embarked on a Salesforce transformation journey. UC will decommission its legacy CRM system and migrate data to Salesforce. The data migration team asked for a recommendation to optimize the performance of the data load to Salesforce. Which approach should be used to meet the requirement?",
//         "answers": {
//             "a": "Use Bulk API to process jobs in parallel mode.",
//             "b": "Contact Salesforce Support to schedule performance tests.",
//             "c": "Use Bulk API to process jobs in serial mode."
//         },
//         "correctAnswer": "a",
//         "explanation": "The Bulk API is designed for loading large volumes of data efficiently. To maximize performance and throughput, jobs should be processed in parallel mode. This allows Salesforce to process multiple batches from the job concurrently, significantly reducing the overall time required for the data migration compared to serial mode, which processes batches one by one.",
//         "multiSelect": false
//     },
//     // Question 28
//     {
//         "question": "A company accepts payment requests 24/7. The company encounters intermittent update errors when two or more processes try to update the same Payment Request record at the same time. Which recommendation should an integration architect make to improve the company's SLA and update conflict handling?",
//         "answers": {
//             "a": "Payment System and Middleware should automatically retry requests.",
//             "b": "Middleware should coordinate request delivery and payment processing.",
//             "c": "Data Entry Point and Middleware should automatically retry requests."
//         },
//         "correctAnswer": "b",
//         "explanation": "The root cause of the problem is a race condition, leading to record locking errors. Simply retrying requests does not solve the underlying conflict. A proper architectural solution is to introduce a coordinator. The middleware is the ideal place to manage this. By implementing a queuing mechanism (e.g., a FIFO queue based on the Payment Request ID), the middleware can ensure that only one process is attempting to update a specific record at any given time, thus eliminating the conflict.",
//         "multiSelect": false
//     },
//     // Question 29
//     {
//         "question": "Northern Trail Outfitters (NTO) uses a custom mobile app to interact with its customers. One of the features of the app is Salesforce Chatter Feeds. NTO wants to automatically post a Chatter item to Twitter whenever the post includes the #thanksNTO hashtag. Which API should an integration architect use to meet this requirement?",
//         "answers": {
//             "a": "Connect REST API",
//             "b": "Streaming API to generate a PushTopic",
//             "c": "REST API"
//         },
//         "correctAnswer": "a",
//         "explanation": "The Connect REST API is specifically designed for building integrations with Salesforce's collaboration and social features, including Chatter, B2B Commerce, and Communities. To programmatically read Chatter feeds, analyze their content (for a hashtag), and interact with them, the Connect API provides the necessary endpoints and data structures. The standard REST API is for general sObject CRUD operations, not rich social interactions.",
//         "multiSelect": false
//     },
//     // Question 30
//     {
//         "question": "A subscription-based media company's Identity and Access Management (IAM) system, which supports SAML, and OpenID, was recently implemented to improve the subscriber experience through self-registration and single sign-on (SSO). The IAM system must integrate with Salesforce to give new self-service customers instant access to Salesforce Community Cloud. Which requirement should Salesforce Community Cloud support for self-registration and SSO?",
//         "answers": {
//             "a": "SAML SSO and Just-in-Time (JIT) provisioning",
//             "b": "OIDC Connect Authentication",
//             "c": "SAML SSO and Registration Handler"
//         },
//         "correctAnswer": "a",
//         "explanation": "The requirements are single sign-on (SSO) and automatic user creation on first login ('instant access'). SAML is a standard protocol for implementing SSO. Just-in-Time (JIT) provisioning is a feature of SAML integration that automatically creates a Salesforce user account the first time a new user logs in via SSO from their identity provider. This combination perfectly meets the business need without requiring a separate user creation process.",
//         "multiSelect": false
//     },
//     {
//         "question": "An enterprise customer is planning to implement Salesforce to support case management. Below is their current system landscape diagram. Considering Salesforce capabilities, what should the integration architect evaluate when integrating Salesforce with the current system landscape? ",
//         "answers": {
//             "a": "Integrate Salesforce with Email Management System, Order Management System, and Case Management System. ",
//             "b": "Integrate Salesforce with Data Warehouse, Order Management and Email Management System. ",
//             "c": "Integrate Salesforce with Order Management System, Data Warehouse and Case Management System. "
//         },
//         "correctAnswer": "a",
//         "explanation": "The primary goal is to implement Salesforce for case management. Salesforce Service Cloud can replace the existing 'Case Management System'. To provide agents with a complete customer view, it needs data from the 'Order Management System'. Salesforce can also handle case-related emails, necessitating integration with or replacement of the 'Email Management System'. The Data Warehouse is a downstream system for analytics, not a primary integration point for operational case management.",
//         "multiSelect": false
//     },
//     {
//         "question": "A company's security assessment noted vulnerabilities on the unmanaged packages in its Salesforce orgs; notably, secrets that are easily accessible and in plain text, such as usernames, passwords, and OAuth tokens used in callouts from Salesforce. Which persistence mechanisms should an integration architect require to be used to ensure that secrets are protected from deliberate or inadvertent exposure? ",
//         "answers": {
//             "a": "Named Credentials and Protected Custom Settings. ",
//             "b": "Encrypted Custom Fields and Protected Custom Settings. ",
//             "c": "Protected Custom Metadata Types and Named Credentials. "
//         },
//         "correctAnswer": "c",
//         "explanation": "Named Credentials are the best practice for securely storing the URL and authentication details for a callout, separating them from code. Protected Custom Metadata Types are ideal for packaging secrets (like API keys) because their values are hidden from subscribers' orgs, providing strong protection for sensitive configuration data.",
//         "multiSelect": false
//     },
//     {
//         "question": "Northern Trail Outfitters needs to secure an integration with an external Microsoft Azure API Gateway. Which integration security mechanism should be employed? ",
//         "answers": {
//             "a": "Assign a user profile and implement an external identity provider with federated SSO access. ",
//             "b": "Configure mutual server authentication with two-way SSL using certificate authority (CA) signed certificates. ",
//             "c": "Configure a connected app with an authorization endpoint of the API Gateway and configure OAuth settings. "
//         },
//         "correctAnswer": "b",
//         "explanation": "Mutual (two-way) SSL authentication provides a very high level of security for server-to-server integrations. It ensures that both the client (Salesforce) and the server (Azure API Gateway) cryptographically verify each other's identity using digital certificates before establishing a connection. This prevents unauthorized systems from communicating with the endpoint.",
//         "multiSelect": false
//     },
//     {
//         "question": "Northern Trail Outfitters needs to send order and line items directly to an existing finance application webservice when an order is fulfilled. It is critical that each order reach the finance application exactly once for accurate invoicing. Which solution should an architect propose? ",
//         "answers": {
//             "a": "Trigger makes future Apex method, with custom error handling process.",
//             "b": "Trigger makes Queueable Apex method, with custom error handling process. ",
//             "c": "Button press makes synchronous callout with user handling retries in case of failure."
//         },
//         "correctAnswer": "b",
//         "explanation": "Achieving 'exactly once' delivery requires a reliable, asynchronous process with robust tracking and error handling. Queueable Apex is superior to future methods because it provides a Job ID for monitoring and allows for more complex logic. By combining a Queueable job with a custom error handling and retry mechanism (e.g., logging attempts and re-queueing on failure), you can build a resilient solution that ensures the message is delivered.",
//         "multiSelect": false
//     },
//     {
//         "question": "A large business-to-consumer (B2C) customer is planning to implement Salesforce CRM... The goals for implementing Salesforce include: 1. Develop a 360-degree view of the customer. 2. Leverage Salesforce capabilities for marketing, sales, and service processes. 3. Reuse Enterprise capabilities built for quoting and order management processes. Which three systems from the current system landscape can be retired with the implementation of Salesforce? ",
//         "answers": {
//             "a": "Sales Activity, Order Management, and Case Management. ",
//             "b": "Order Management, Case Management, and Email Marketing. ",
//             "c": "Email Marketing, Sales Activity, and Case Management. "
//         },
//         "correctAnswer": "c",
//         "explanation": "The requirements state the goal is to leverage Salesforce for marketing, sales, and service. This means Salesforce's native capabilities can replace the existing 'Email Marketing System' (with Marketing Cloud), 'Sales Activity Management System' (with Sales Cloud), and 'Case Management System' (with Service Cloud). The requirements explicitly state to 'reuse' the Quoting and Order Management systems, so they would not be retired.",
//         "multiSelect": false
//     },
//     {
//         "question": "A company captures orders and needs to send them to the Order fulfillment system. The user is not required to have confirmation from the Order fulfillment system. Which system constraint question should be considered when designing an integration to send orders from Salesforce to a fulfillment system? ",
//         "answers": {
//             "a": "Will the fulfillment system validate order shipping addresses? ",
//             "b": "Can the fulfillment system implement a contract-first Outbound Messaging interface? ",
//             "c": "What latency is acceptable for orders to reach the fulfillment system? "
//         },
//         "correctAnswer": "c",
//         "explanation": "Since the user does not need immediate confirmation, this implies an asynchronous, fire-and-forget integration pattern. For any asynchronous process, defining the acceptable latency (the maximum allowed delay for the message to arrive) is a critical non-functional requirement. This influences the choice of technology, error handling strategy, and monitoring approach.",
//         "multiSelect": false
//     },
//     {
//         "question": "An integration architect has received a request to prevent employees that leave the company from accessing data in Salesforce after they are deactivated in the company's HR system. What should the integration architect determine before recommending a solution? ",
//         "answers": {
//             "a": "Data access prevention requirements, then identity frequency. ",
//             "b": "Integration pattern requirements, then identity frequency. ",
//             "c": "Data access prevention requirements, integration requirements, and system constraints. "
//         },
//         "correctAnswer": "c",
//         "explanation": "A comprehensive solution requires a full understanding of the landscape. The architect must know the specific access prevention rules (e.g., how fast must deactivation occur), the integration capabilities of the HR system (e.g., real-time API vs. nightly file export), and system constraints of both platforms (e.g., API limits, reliability) to design a solution that is both effective and feasible.",
//         "multiSelect": false
//     },
//     {
//         "question": "Northern Trail Outfitters uses Salesforce to track leads and opportunities, and to capture order details. However, Salesforce isn't the system that holds or processes orders... After the order details are captured in Salesforce, an order must be created in the remote system, which manages the order's lifecycle. The integration architect... is recommending a remote system that will subscribe to the platform event defined in Salesforce. Which integration pattern should be used for this business use case? ",
//         "answers": {
//             "a": "Remote Call-In. ",
//             "b": "Fire and Forget. ",
//             "c": "Request and Reply. "
//         },
//         "correctAnswer": "b",
//         "explanation": "The use of Platform Events is a classic implementation of the Fire and Forget pattern. Salesforce publishes (fires) an event message to the event bus and does not wait for a response or acknowledgment from subscribers. It 'forgets' about the message after publishing. This decouples the systems, making the integration resilient and scalable.",
//         "multiSelect": false
//     },
//     {
//         "question": "Northern Trail Outfitters needs to make synchronous callouts to 'available-to-promise' services to query product availability and reserve inventory during the customer checkout process. What should an integration architect consider when building a scalable integration solution? ",
//         "answers": {
//             "a": "The maximum query timeout open per user on the service. ",
//             "b": "How many concurrent service calls are being placed. ",
//             "c": "The number of batch jobs that can be run concurrently. "
//         },
//         "correctAnswer": "b",
//         "explanation": "For a real-time, synchronous process like a customer checkout, scalability is determined by the system's ability to handle peak load. The most important metric for this is the number of concurrent requests. Understanding this helps in designing for Salesforce governor limits (e.g., concurrent long-running Apex requests) and ensuring the external service is provisioned to handle the expected volume without performance issues.",
//         "multiSelect": false
//     },
//     {
//         "question": "Universal Containers (UC) is a global financial company... Support agents open bank accounts on the spot for customers... UC's core banking system is the system of record... and all accounts opened in Salesforce have to be synced in real time to the core banking system. Support agents need to inform the customers with the newly created bank account ID, which has to be generated from the core banking system. Which integration pattern is recommended for this use case? ",
//         "answers": {
//             "a": "Request and Reply. ",
//             "b": "Streaming API to generate PushTopic. ",
//             "c": "Salesforce platform event. "
//         },
//         "correctAnswer": "a",
//         "explanation": "The business process requires Salesforce to make a call to an external system and wait for an immediate response (the new bank account ID) to complete the user's transaction. This synchronous, blocking interaction is the definition of the Request and Reply pattern. Asynchronous patterns like Platform Events or Streaming API would not work as they do not provide an immediate response to the user's active session.",
//         "multiSelect": false
//     },
//     {
//         "question": "The director of customer service at Northern Trail Outfitters wants to capture and trend specific business events that occur in Salesforce in real time. The metrics will be accessed in an ad-hoc manner using an external analytics system. The events are as follows: 1. A customer initiates a product exchange via a Case... 2. A customer service rep clicks on the 'Authorize Exchange Product' menu item... etc. Which solution should meet these business requirements? ",
//         "answers": {
//             "a": "An Apex trigger that sends an outbound message. ",
//             "b": "A workflow rule that sends an outbound message.",
//             "c": "Publish platform events that are consumed by the external analytics system. "
//         },
//         "correctAnswer": "c",
//         "explanation": "Platform Events are the ideal mechanism for broadcasting real-time, meaningful business events from Salesforce to one or more external systems. They create a decoupled architecture where an external analytics system can subscribe to the event stream and process the events as needed, without creating a tight dependency on Salesforce. This is more flexible and scalable than point-to-point solutions like Outbound Messaging.",
//         "multiSelect": false
//     },
//     {
//         "question": "Which Web Services Description Language (WSDL) should an architect consider when creating an integration that might be used for more than one Salesforce org and different metadata? ",
//         "answers": {
//             "a": "Partner WSDL. ",
//             "b": "SOAP API WSDL.",
//             "c": "Enterprise WSDL. "
//         },
//         "correctAnswer": "a",
//         "explanation": "The Partner WSDL is loosely typed, meaning it is not bound to the specific schema (objects, fields) of a particular Salesforce org. This makes it the correct choice for building generic applications (e.g., by an ISV or for a multi-org company) that can work with any Salesforce org, regardless of its unique customizations. The Enterprise WSDL is strongly typed and is specific to the org from which it was generated.",
//         "multiSelect": false
//     },
//     {
//         "question": "Northern Trail Outfitters (NTO) wants to improve the quality of callouts from Salesforce to its REST APIs. For this purpose, NTO will require all API clients/consumers to adhere to REST API Markup Language (RAML) specifications... Which design specification should the integration architect include in the integration architecture to ensure that Apex REST API Clients unit tests confirm adherence to the RAML specs? ",
//         "answers": {
//             "a": "Require the Apex REST API Clients to implement their own HttpCalloutMock. ",
//             "b": "Implement HttpCalloutMock to return responses per the RAML specification. ",
//             "c": "Call the HttpCalloutMock implementation from the Apex REST API Clients."
//         },
//         "correctAnswer": "b",
//         "explanation": "To enforce a contract (the RAML spec) during testing, a standardized mock implementation is needed. By creating a central, reusable `HttpCalloutMock` class that generates responses precisely matching the RAML specification, you ensure all Apex unit tests are validated against the same contract. This prevents inconsistencies and confirms that the Apex code correctly handles the expected responses and error conditions defined in the API specification.",
//         "multiSelect": false
//     },
//     {
//         "question": "Northern Trail Outfitters requires an integration to be set up between one of its Salesforce orgs and an External Data Source using Salesforce Connect. The External Data Source supports Open Data Protocol. Which configuration should an integration architect recommend be implemented in order to secure requests coming from Salesforce? ",
//         "answers": {
//             "a": "Configure Identity Type for OData connection. ",
//             "b": "Configure Special Compatibility for OData connection. ",
//             "c": "Configure CSRF Protection for OData connection. "
//         },
//         "correctAnswer": "a",
//         "explanation": "The 'Identity Type' setting on a Salesforce Connect external data source is the primary mechanism for configuring authentication. It determines how Salesforce identifies itself to the external system. The options, 'Per User' and 'Named Principal', allow the architect to define the authentication flow, which is the fundamental step in securing the connection between Salesforce and the external OData source.",
//         "multiSelect": false
//     },
//     {
//         "question": "A company... has to be verified by 10 different training accreditation verification agencies... Each... has its own response time, which means it could take days to confirm a trainer. The company decided to automate the trainer accreditation verification process... What is the recommended approach to automate this process? ",
//         "answers": {
//             "a": "Use middleware to handle the callout to the 10 different verification services, the middleware will handle the business logic of consolidating the verification result... Then, make a call in to Salesforce and update the verification status... ",
//             "b": "Use Salesforce External Service to make the callout... ",
//             "c": "Make Apex callout using @future annotation to make the callout to all different agencies... "
//         },
//         "correctAnswer": "a",
//         "explanation": "This scenario describes a long-running, complex orchestration involving multiple external systems with unpredictable response times. This is a classic use case for a middleware platform. Middleware is designed to manage stateful, long-running processes, handle callbacks, aggregate results from multiple sources, and implement complex error handling and retry logic. Attempting to manage this process entirely within Salesforce would be complex and likely to hit platform limits.",
//         "multiSelect": false
//     },
//     {
//         "question": "What should an integration architect consider when recommending Platform Events as an integration solution? ",
//         "answers": {
//             "a": "When an event definition is deleted, it's permanently removed and can't be restored. ",
//             "b": "Event Monitoring is used to track user activity, such as logins and running reports. ",
//             "c": "Subscribe to an AssetTokenEvent stream to monitor OAuth 2.0 authentication activity. "
//         },
//         "correctAnswer": "a",
//         "explanation": "This is a critical operational consideration. Unlike standard or custom object records, which go to the Recycle Bin, deleting a Platform Event's definition is an irreversible action. An architect must communicate this risk to ensure strong governance and change management processes are in place to prevent the accidental deletion of an event definition that is critical to an integration.",
//         "multiSelect": false
//     },
//     {
//         "question": "An integration developer is developing an HR synchronization app... The app synchronizes Salesforce record data changes with an HR system that's external to Salesforce. What should the integration architect recommend to ensure notifications are stored for up to 3 days if data replication fails? ",
//         "answers": {
//             "a": "Callouts. ",
//             "b": "Change Data Capture. ",
//             "c": "Outbound Message. "
//         },
//         "correctAnswer": "b",
//         "explanation": "Change Data Capture (CDC) is specifically designed for durable, reliable data synchronization. It publishes events for record changes and retains them on the event bus for up to three days. This allows a subscriber application to 'catch up' on missed events after a period of downtime, ensuring data consistency without losing changes.",
//         "multiSelect": false
//     },
//     {
//         "question": "Universal Containers (UC)... owns a legacy homegrown application that also stores a copy of customer data... Both Salesforce and the homegrown application should be kept synchronized... Requirements: 1. When a contact record in Salesforce is updated, the external homegrown application should also be updated. 2. The synchronization should be event-driven. 3. The integration should be asynchronous. Which option should an architect recommend? ",
//         "answers": {
//             "a": "Leverage Platform Events to publish a custom event message containing changes to the Contact object. ",
//             "b": "Leverage Change Data Capture to track changes to the Contact object and write a CometD subscriber on the external application. ",
//             "c": "Use an extract, transform, load (ETL) tool to keep Salesforce and the homegrown application in sync on a regular cadence. "
//         },
//         "correctAnswer": "b",
//         "explanation": "Change Data Capture (CDC) perfectly matches all requirements. It is an event-driven mechanism that asynchronously publishes detailed change events for standard and custom objects. An external application can subscribe to this event stream using a CometD client to receive near-real-time updates. This is a more direct and efficient solution than creating custom Platform Events with Apex triggers for this common data replication use case.",
//         "multiSelect": false
//     },
//     {
//         "question": "A customer is migrating from an old legacy system to Salesforce. As part of the modernization effort, the customer would like to integrate all existing systems that currently work with its legacy application with Salesforce. Which constraint/pain-point should an integration architect consider when choosing the integration pattern/mechanism?",
//         "answers": {
//             "a": "Reporting and usability requirements.",
//             "b": "Data volume and processing volume.",
//             "c": "Multi-language and multi-currency requirements."
//         },
//         "correctAnswer": "b",
//         "explanation": "When planning a large-scale integration and migration, the **volume of data** and the **required processing throughput** are primary architectural drivers. These non-functional requirements directly influence the choice of integration patterns (e.g., batch processing vs. real-time events), the specific Salesforce APIs to use (e.g., Bulk API for high volumes), and the overall design for scalability and performance. Other requirements are important, but data and processing volume fundamentally constrain the technical solution.",
//         "multiSelect": false
//     },
//     {
//         "question": "Universal Containers (UC) is planning to implement Salesforce as its CRM... The proposed CRM system is expected to provide sales and support people with a single view of their customers... What should an integration architect consider to support the proposed CRM system strategy?",
//         "answers": {
//             "a": "Expose out-of-the-box connectors for ERP, Marketing, and Microsoft Outlook systems.",
//             "b": "Document current and future state architecture. Propose a reference system that can support interfaces between systems with different APIs and identify the canonical data model.",
//             "c": "Propose an integration system that can support interfaces between systems with different APIs."
//         },
//         "correctAnswer": "b",
//         "explanation": "A successful integration strategy begins with solid architectural planning. An architect must first **document the current landscape** and define the desired **future state architecture**. This process includes proposing a reference architecture (often involving middleware) to handle communication between diverse systems and defining a **canonical data model**—a standardized, system-agnostic data structure—to ensure data consistency and simplify transformations across the enterprise. This strategic approach is crucial for building a maintainable and scalable solution.",
//         "multiSelect": false
//     },
//     {
//         "question": "Northern Trail Outfitters is planning to perform nightly batch loads into Salesforce from an external system with a custom Java application using the Bulk API. The CIO is curious about monitoring recommendations for the jobs from the technical architect. Which recommendation should help meet the requirements?",
//         "answers": {
//             "a": "Set the Salesforce debug logs level to fine, and add the user ID running the job to monitor in the 'Debug Logs' in the setup menu.",
//             "b": "Visually monitor in the Salesforce UI using the 'Bulk Data Load Jobs' in Salesforce in the setup menu.",
//             "c": "Write the entire response for the Bulk API status to a custom error logging object in Salesforce using an Apex trigger, and create reports on the object."
//         },
//         "correctAnswer": "c",
//         "explanation": "For automated, scalable monitoring of batch processes, it's essential to programmatically capture the results. The custom Java application should be built to get the final status of each Bulk API job and then make a subsequent API call to write key status information (job ID, status, records failed, error messages) into a **custom logging object** in Salesforce. This enables automated reporting, dashboarding, and alerting (e.g., send an email on failure), providing a far more robust and proactive monitoring solution than manual UI checks or temporary debug logs.",
//         "multiSelect": false
//     },
//     {
//         "question": "A company... has a payment gateway that takes more than 30 seconds to process the payment transaction. Students would like to get the payment result in real time... What is the recommended integration approach to process payments based on this requirement?",
//         "answers": {
//             "a": "Use Platform Events to process payment to the payment gateway.",
//             "b": "Use Continuation to process payment to the payment gateway.",
//             "c": "Use Request and Reply to make an API call to the payment gateway."
//         },
//         "correctAnswer": "b",
//         "explanation": "The **Continuation framework** is specifically designed for long-running callouts initiated from a user interface (like a Community). A standard synchronous callout would tie up a server thread and likely time out. With a Continuation, the server initiates the callout and then releases the thread. When the external payment gateway responds (after 30+ seconds), a designated callback method is invoked to process the result and update the UI, providing a seamless, real-time experience for the user without consuming limited server resources.",
//         "multiSelect": false
//     },
//     {
//         "question": "An enterprise customer... has... an Enterprise Billing System (EBS)... and an Enterprise Document Management System (DMS). Only authorized users are allowed access... Customer Support needs seamless access... Which authorization and authentication need should an integration consultant consider while integrating the DMS and EBS with Salesforce?",
//         "answers": {
//             "a": "Consider options to integrate DMS and EBS into Salesforce.",
//             "b": "Consider Enterprise security needs for access to DMS and EBS.",
//             "c": "Consider options to maintain DMS and EBS authentication and authorization details in Salesforce."
//         },
//         "correctAnswer": "b",
//         "explanation": "The most critical consideration is how to adhere to the existing, strict security policies of the external systems. The integration must respect that only authorized users can access the DMS and EBS. This means the solution must focus on securely propagating the user's identity and permissions from Salesforce to the backend systems, likely using a pattern like **Single Sign-On (SSO)** or **token exchange**. The integration must enforce, not bypass, the enterprise's security model.",
//         "multiSelect": false
//     },
//     {
//         "question": "What should an integration architect recommend to ensure all integrations to the Northern Trail Outfitters' company portal use SSL mutual authentication?",
//         "answers": {
//             "a": "Generate a certificate authority (CA) signed certificate.",
//             "b": "Enforce SSL/TLS Mutual Authentication.",
//             "c": "Enable My Domain and SSL/TLS."
//         },
//         "correctAnswer": "b",
//         "explanation": "To require that all inbound API clients present a certificate, the Salesforce administrator must enable the org-wide setting **'Enforce SSL/TLS Mutual Authentication'**. This setting makes mutual authentication mandatory for all inbound connections to Salesforce. While the clients will need to generate their own certificates (as in option A), the enforcement is controlled by this specific Salesforce setting.",
//         "multiSelect": false
//     },
//     {
//         "question": "Northern Trail Outfitters is creating a distributable Salesforce package... The package needs to call into a custom Apex REST endpoint in the central org. The security team wants to ensure a specific integration account is used... Which item should an architect recommend to secure the integration in the package?",
//         "answers": {
//             "a": "A custom field to store the password...",
//             "b": "Contact Salesforce Support...",
//             "c": "Create a connected app in the central org and add the callback URL for each org the package is installed in to redirect after a successful auth."
//         },
//         "correctAnswer": "c",
//         "explanation": "The standard and secure method for enabling a packaged application to authenticate to a central org is OAuth 2.0. This is achieved by creating a **Connected App in the central org**. The package contains the necessary configuration to initiate an OAuth flow. After installation in a subscriber org, an admin completes a one-time authorization process. For a server-to-server scenario requiring a specific integration user, the JWT Bearer Flow is ideal, but the Web Server flow (described in the answer) is also a valid and secure mechanism to establish the authenticated connection.",
//         "multiSelect": false
//     },
//     {
//         "question": "Northern Trail Outfitters submits orders to the manufacturing system web service. Recently, the system has experienced outages that keep service unavailable for several days. Which solution should an integration architect recommend to handle errors during these types of service outages?",
//         "answers": {
//             "a": "Use Platform Event replayId and custom scheduled Apex process to retrieve missed events.",
//             "b": "Use middleware queuing and buffering to insulate Salesforce from system outages.",
//             "c": "Use Outbound Messaging to automatically retry failed service calls."
//         },
//         "correctAnswer": "b",
//         "explanation": "For extended outages lasting several days, a simple retry mechanism like Outbound Messaging (which only retries for 24 hours) is insufficient. Middleware with a queuing system is the most robust solution. It can accept messages from Salesforce, store them durably in a queue, and deliver them to the manufacturing system once it becomes available. This effectively decouples the systems and prevents data loss during prolonged downtime.",
//         "multiSelect": false
//     },
//     {
//         "question": "Universal Containers (UC) is a large printing company... The design files are stored in an on-premise file store... UC would like to collaborate with the third-party agencies on the design files and allow them to view the design files in the community. The conceptual design files size is 2.5 GB. Which solution should an integration architect recommend?",
//         "answers": {
//             "a": "Use Files Connect to access the on-premise file store.",
//             "b": "Replicate the files to Salesforce.",
//             "c": "Use Chatter to collaborate on the files."
//         },
//         "correctAnswer": "a",
//         "explanation": "Replicating extremely large files (2.5 GB) into Salesforce is impractical due to storage limits and costs. Files Connect is the designed solution for this scenario. It allows Salesforce users to access, browse, and share files stored in external systems (like an on-premise file store) directly within the Salesforce UI and communities without physically moving the files into Salesforce.",
//         "multiSelect": false
//     },
//     {
//         "question": "An architect decided to use Platform Events for integrating Salesforce with an external system for a company. What should an architect consider when proposing this type of integration mechanism?",
//         "answers": {
//             "a": "External system needs to have the same uptime in order to be able to keep up with Salesforce Platform Events.",
//             "b": "Salesforce needs to be able to store information about the external system in order to know which event to send out.",
//             "c": "To subscribe to an event, the integration user in Salesforce needs Read access to the event entity."
//         },
//         "correctAnswer": "c",
//         "explanation": "This is a fundamental security requirement. An external client subscribes to the event bus by authenticating as a Salesforce user. For the subscription to be successful and for the client to receive event notifications, that integration user's profile or permission set must have 'Read' permissions on the specific Platform Event object.",
//         "multiSelect": false
//     },
//     {
//         "question": "Northern Trail Outfitters wants to use Salesforce as a front end... An order is created in Salesforce when the opportunity is Closed/Won, but the back-end ERP system is the data master for order... The customer wants to be able to see within Salesforce all the stages of order processing like Order Created, Order Shipped, and Order Paid... Which message durability consideration should an integration architect make when designing a solution to meet these business requirements?",
//         "answers": {
//             "a": "High-volume event messages are stored for 24 hours (1 day).",
//             "b": "High-volume event messages are stored for 72 hours (3 days).",
//             "c": "When subscribing to Salesforce Event Bus, replayId is used with a value of -2 to be able to see new events."
//         },
//         "correctAnswer": "b",
//         "explanation": "This scenario involves order status updates from an ERP being sent to Salesforce. Using High-Volume Platform Events is appropriate. A key feature for durability and reliability is the event retention window. High-Volume Platform Events are retained on the event bus for 72 hours (3 days), allowing subscribers in Salesforce to retrieve any missed events after downtime.",
//         "multiSelect": false
//     },
//     {
//         "question": "A new Salesforce program has the following high-level abstract requirement: Business processes executed on Salesforce require data updates between some internal systems and Salesforce. Which relevant details should a Salesforce integration architect seek to specifically solve for the integration architecture needs of the program?",
//         "answers": {
//             "a": "Core functional and non-functional requirements for User Experience design, Encryption needs, Community, and license choices.",
//             "b": "Integration skills, SME availability, and Program Governance details.",
//             "c": "Source and Target systems, Directionality, and data volume, transformation complexity, along with any middleware that can be leveraged."
//         },
//         "correctAnswer": "c",
//         "explanation": "To design an integration architecture, the architect must first understand the fundamental requirements of the data flows. This includes identifying the source and target systems, the direction of the data flow, the volume and frequency of data, and the complexity of any required transformations. These core details are essential before selecting patterns or technologies.",
//         "multiSelect": false
//     },
//     {
//         "question": "A customer is evaluating the Platform Events solution and would like help in comparing/contrasting it with Outbound Messaging for real-time/near-real time needs. They expect 3,000 customers to view messages in Salesforce. What should be evaluated and highlighted when deciding between the solutions?",
//         "answers": {
//             "a": "In both Platform Events and Outbound Messaging, the event messages are retried by and delivered in sequence, and only once. Salesforce ensures there is no duplicate message delivery.",
//             "b": "Message sequence is possible in Outbound Messaging, but not guaranteed with Platform Events. Both offer very high reliability. Fault handling and delivery are fully handled by Salesforce.",
//             "c": "Both Platform Events and Outbound Messaging offer declarative means for achieving near real-time needs. They aren't best suited for all integrations."
//         },
//         "correctAnswer": "b",
//         "explanation": "This option correctly identifies a key difference: Outbound Messaging maintains the order of messages for a given record, whereas Platform Events do not guarantee order. Both are highly reliable solutions managed by Salesforce. Platform Events are generally more scalable and flexible for modern, event-driven architectures, while Outbound Messaging is a simpler, point-to-point SOAP-based solution with guaranteed ordering.",
//         "multiSelect": false
//     },
//     {
//         "question": "An integration architect has built a solution using REST API, updating Account, Contact, and other related information. The data volumes have increased, resulting in higher API calls consumed... A decision was made to decrease the number of API calls using bulk updates... Which REST API composite resources should the integration architect use to allow up to 200 records in one API call?",
//         "answers": {
//             "a": "Batch",
//             "b": "SObject Tree",
//             "c": "Composite"
//         },
//         "correctAnswer": "b",
//         "explanation": "The Composite SObject Tree resource is specifically designed to create hierarchies of related records in a single request. It allows you to create, for instance, an Account and its related Contacts in one API call. It supports a total of up to 200 records across the entire request, making it ideal for bulk-inserting related data while minimizing API calls.",
//         "multiSelect": false
//     },
//     {
//         "question": "Salesforce users need to read data from an external system via an HTTP request. Which security methods should an integration architect leverage within Salesforce to secure the integration?",
//         "answers": {
//             "a": "Authorization Provider and Named Credentials.",
//             "b": "Two-way SSL and Authorization Provider.",
//             "c": "Named Credentials and Two-way SSL."
//         },
//         "correctAnswer": "c",
//         "explanation": "This combination provides a layered security approach. Named Credentials securely handle the application-level authentication (e.g., username/password, OAuth token) and abstract the endpoint URL from the code. Two-way SSL (mutual TLS) adds a transport-level security layer where both Salesforce and the external system verify each other's identity using certificates before any data is transmitted. Using both is a best practice for highly secure callouts.",
//         "multiSelect": false
//     },
//     {
//         "question": "What should an integration architect consider when recommending Platform Events as an integration solution?",
//         "answers": {
//             "a": "Event Monitoring is used to track user activity, such as logins and running reports.",
//             "b": "Subscribe to an AssetTokenEvent stream to monitor OAuth 2.0 authentication activity.",
//             "c": "When an event definition is deleted, it's permanently removed and can't be restored."
//         },
//         "correctAnswer": "c",
//         "explanation": "This is a critical consideration for the lifecycle management of an integration. Deleting a Platform Event definition is an irreversible action that can break any subscribing applications. Architects must plan for this, often by versioning events rather than deleting them, to ensure long-term stability.",
//         "multiSelect": false
//     },
//     {
//         "question": "Universal Containers (UC) is a global financial company. UC support agents would like to open bank accounts on the spot for customers who Inquire about UC products. During the bank account opening process, the agents execute credit checks for the customers through external agencies. At any given time, up to 30 concurrent reps will be using the service to perform credit checks for customers. Which error handling mechanisms should be built to display an error to the agent when the credit verification process has falled?",
//         "answers": {
//             "a": "Handle Integration errors in the middleware in case the verification process is down, then the middleware should retry processing the request multiple times.",
//             "b": "In case the verification process is down, use fire and forget mechanism instead of Request and Reply to allow the agent to get the response back when the service is back online.",
//             "c": "In case the verification process is down, use mock service to send the response to the agent"
//         },
//         "correctAnswer": "a",
//         "explanation": "A robust solution involves middleware to handle transient errors from the external service. The middleware can attempt retries for a short period. If the retries fail, it should return a definitive error status to the Salesforce UI, which can then display an appropriate message to the agent.",
//         "multiSelect": false
//     },
//     {
//         "question": "What is the first thing an integration architect should validate if a callout from a Lightning web component to an external endpoint is falling?",
//         "answers": {
//             "a": "The endpoint domain has been added to Cross-Origin Resource Sharing.",
//             "b": "The endpoint URL has been added to Remote Site Settings.",
//             "c": "The endpoint URL has been added to Content Security Policies."
//         },
//         "correctAnswer": [
//             "a",
//             "b"
//         ],
//         "explanation": "The correct answer depends on where the callout originates. \n1. **If the LWC makes the callout directly** from the browser (e.g., using the `fetch` API), the browser's security policy requires the external service to have a **CORS** policy that whitelists the Salesforce domain. Since callouts from an LWC can fail for either reason, both are primary validation steps.",
//         "multiSelect": true
//     },
//     {
//         "question": "Northern Trall Outfitters leverages Sales Cloud for tracking and managing leads, accounts, contacts, and opportunities. Orders and order fulfillment is taken care of by an Order Management System (OMS) in the back office. When an opportunity has changed its status to \"Closed/Won\" and there are products attached, the details should be passed to the OMS for fulfillment operations The callout from Salesforce to the OMS should be synchronous.",
//         "answers": {
//             "a": "Build a Lightning component that makes a synchronous Apex REST callout to the OMS when a button is clicked.",
//             "b": "Wnte a trigger that invokes an Apex proxy class to make a REST callout to the OMS.",
//             "c": "Develop a batch Apex job that aggregates closed opportunities and makes a REST callout to the OMS hourly."
//         },
//         "correctAnswer": "a",
//         "explanation": "There is a conflict in the requirements. A synchronous callout cannot be made from a trigger context. This implies the architect must advise a change in the business process from fully automated (on status change) to user-initiated (button click) to meet the synchronous technical constraint.",
//         "multiSelect": false
//     },
//     {
//         "question": "A new Salesforce program has the following high-level abstract requirement: Business processes executed on Salesforce require dats updates between some internal systems and Salesforce. Which relevant details should a Salesforce Integration architect seek to specifically solve for the integration architecture needs of the program?",
//         "answers": {
//             "a": "Core functional and non-functional requirements for User Experience design, Encryption needs, Community, and license choices",
//             "b": "Source and Target system, Directionality, and data volume & transformation complexity, along with any middleware that can be leveraged",
//             "c": "Integration skills, SME availability, and Program Governance details."
//         },
//         "correctAnswer": "b",
//         "explanation": "To design an integration architecture, the most fundamental details are about the data flow itself. An architect must identify the **source and target systems**, the **directionality** of data flow (e.g., one-way, bi-directional), the anticipated **data volume**, and the complexity of any required **data transformations**. These factors directly influence the choice of integration pattern, API, and technology.",
//         "multiSelect": false
//     },
//     {
//         "question": "Northern Trail Outfitters is planning to perform nightly batch loads into Salesforce from an external system with a custom Java application using the Buik API. The CIO is curious about monitoring recommendations for the jobs from the technical architect Which recommendation should help meet the requirements?",
//         "answers": {
//             "a": "Visually monitor in the Salesforce Ut using the \"Bulk Data Load Jobs in Salesforce in the setup menu.",
//             "b": "Write the error response from the Bulk API status to a custom error logging object in Salesforce using an Apex trigger, and create reports on the object.",
//             "c": "Set the Salesforce debug logs level to \"finest, and add the user ID running the job to monitor in the \"Debug Logs\" in the setup menu"
//         },
//         "correctAnswer": "a",
//         "explanation": "The simplest and most direct way to monitor Bulk API jobs is using the standard user interface provided by Salesforce. The **Bulk Data Load Jobs** page in Setup provides a visual overview of job status, records processed, and failures, which is suitable for high-level monitoring as requested by a CIO. Custom logging objects are overly complex for a basic monitoring need, and debug logs are meant for granular, short-term debugging, not routine job monitoring.",
//         "multiSelect": false
//     },
//     {
//         "question": "A customer is migrating from an old legacy system to Salesforce. As part of the modernization effort, the customer would like to integrate all existing systems that currently work with its legacy application with Salesforce. Which constraint/pain-point should an integration architect consider when choosing the integration pattern/mechanism?",
//         "answers": {
//             "a": "Data volume and processing volume",
//             "b": "Multi-language and multi-currency requirement",
//             "c": "Reporting and usablity requirements"
//         },
//         "correctAnswer": "a",
//         "explanation": "**Data volume and processing volume** are primary drivers in choosing an integration pattern. High data volumes necessitate batch patterns using the Bulk API to avoid hitting governor limits, while low-volume, transactional needs might use real-time REST API patterns. The scale of the data is a fundamental constraint that shapes the entire architecture.",
//         "multiSelect": false
//     },
//     {
//         "question": "An integration developer is developing an HR synchronization app for a cilent. The app synchronizes Salesforce record data changes with an HR system that's external to Salesforce What should the integration architect recommend to ensure notifications are stored for up to 3 days if data replication fails?",
//         "answers": {
//             "a": "Change Data Capture",
//             "b": "Outbound Message",
//             "c": "Callouts"
//         },
//         "correctAnswer": "a",
//         "explanation": "**Change Data Capture (CDC)** is designed for this scenario. It publishes data change events to a stream that are retained for up to three days. If the external HR system goes offline, it can reconnect later and use the stored `replayId` to retrieve all the events it missed, ensuring data synchronization without loss.",
//         "multiSelect": false
//     },
//     {
//         "question": "Universal Containers (UC) is planning to Implement Salesforce as its CRM system. Currently, UC has the following systems: 1. Leads are managed in a Marketing system. 2. Sales people use Microsoft Outlook to enter contacts and emails, and manage activities. 3. Inventory. Billing, and Payments are managed in UC's Enterprise Resource Planning (ERP) system. The proposed CRM system is expected to provide sales and support people with a single view of their customers and the ability to manage their contacts, emails, and activities in the Salesforce CRM What should an integration architect consider to support the proposed CRM system strategy?",
//         "answers": {
//             "a": "Evaluate current and future date and system usage, and then identify potential integration requirements to Selesforce.",
//             "b": "Explore out-of-the-box Salesforce connectors for Integration with ERP, Marketing, and Microsoft Outlook systems.",
//             "c": "Propose a middleware system that can support interface between systems with Salesforce."
//         },
//         "correctAnswer": "a",
//         "explanation": "The first step in any integration strategy is discovery and analysis. Before proposing solutions like connectors or middleware, the architect must **evaluate the current landscape, understand data flows, and identify the specific integration requirements**. This foundational work ensures that the chosen solution actually solves the business problem effectively.",
//         "multiSelect": false
//     },
//     {
//         "question": "Salesforce users need to read data from an external system via an HTTP request. Which security methods should an integration architect leverage within Salesforce to secure the integration?",
//         "answers": {
//             "a": "Two-way SSL and Authorization Provider",
//             "b": "Named Credentials and Two-way SSL",
//             "c": "Authorization Provider and Named Credentials."
//         },
//         "correctAnswer": "b",
//         "explanation": "**Named Credentials** are the best practice for securing outbound callouts from Salesforce. They abstract the endpoint URL and authentication details from the code, allowing for secure storage and management of credentials. **Two-way SSL** (mutual TLS) adds another layer of security by requiring both the client (Salesforce) and the server to exchange and validate certificates, ensuring both parties are who they claim to be.",
//         "multiSelect": false
//     },
//     {
//         "question": "An enterprise architect has requested the Salesforce integration architect to review the following diagram and description and provide recommendations. About 3,000 phone sales agents use a Salesforce Lightning user interface (UI) concurrently to check eligibility of a customer for a qualifying offer. The external eligibility systems could take up to 90 seconds to process a response. However, an API Gateway in the middle imposes a strict 9-second timeout on requests. Which recommendation should the integration architect make?",
//         "answers": {
//             "a": "Recommend synchronous Apex callouts from Lightning UI to External Systems via Mule and implement polling on an API Gateway timeout.",
//             "b": "Use Continuation callouts to make the eligibility check request from Salesforce Lightning Ul at page load.",
//             "c": "Create a platform event in Salesforce via Remote Call-In and use the empAPI in the Lightning UI to serve 3,000 concurrent users when responses are received by Muls."
//         },
//         "correctAnswer": "c",
//         "explanation": "This scenario requires an asynchronous pattern to handle a long-running process initiated from the UI, especially with a short intermediary timeout. The best solution is an event-driven callback: \n1. The Lightning UI makes a quick request to start the process (Fire and Forget). \n2. MuleSoft handles the long 90-second call. \n3. When finished, MuleSoft makes a 'Remote Call-In' to Salesforce to publish a Platform Event. \n4. The original Lightning UI, subscribed via the `empApi`, receives the event and displays the result to the user. This avoids all timeouts and provides a seamless user experience.",
//         "multiSelect": false
//     },
//     {
//         "question": "Northern Trail Outfitters needs to use Shield Platform Encryption to encrypt social security numbers in order to meet a business requirement. Which action should an integration architect take prior to the implementation of Shield Platform Encryption?",
//         "answers": {
//             "a": "Encrypt the data using the most current key.",
//             "b": "Encrypt all the data so that it is secure.",
//             "c": "Use Shield Platform Encryption as a user authentication or authorization tool"
//         },
//         "correctAnswer": "",
//         "explanation": "None of the provided options are correct prerequisite actions. Before implementing Shield Platform Encryption, an architect must analyze the impact on system functionality. Key considerations include how encryption affects SOQL `WHERE` clauses, reporting, search, formula fields, and integration filter criteria, as many of these do not work on encrypted fields. The provided answers describe incorrect uses or are part of the implementation itself, not a pre-implementation analysis.",
//         "multiSelect": false
//     },
//     {
//         "question": "A customer of Salesforce has used Platform Events to integrate their Salesforce instance with an extermal third-party artificial Intelligence (AI) system. The Al system provides a prediction score for each lead that is received by Salesforce. Once the prediction score is received, the lead iriformation is saved to Platform Events for other processes. The trigger on the Platform Events has falled ever since it was rolled out to production Which type of monitoring should the integration consultant have considered to monitor this integration",
//         "answers": {
//             "a": "Set up debug legs for Platform Event triggers to monitor performance",
//             "b": "Validate that the Platform Event definition matches lead's definition.",
//             "c": "Monitor Platform Events created per hour limits across the Salesforce instance"
//         },
//         "correctAnswer": "a",
//         "explanation": "When an Apex trigger is failing, the most direct way to diagnose the problem is to capture a **debug log** of its execution. By setting up debug logs for the Automated Process user (which executes event triggers), the consultant can see the exact error message, exception type, and the code path that led to the failure, allowing for efficient debugging.",
//         "multiSelect": false
//     },
//     {
//         "question": "Northern Trail Outfitters has recently Implemented middleware for orchestration of services across platforms. The Enterprise Resource Planning (ERP) system being used requires transactions be captured near real time at a REST endpoint initiated in Salesforce when creating an Order object. Additionally, the Salesforce team has limited development resources and requires a low-code solution, Which option should fulfill the use case requirements?",
//         "answers": {
//             "a": "Use Lightning Flow to create a platform event, selecting the record type as the platform event name on insert of record.",
//             "b": "Implement Change Data Capture on the Order object and leverage the replay ID in the middleware solution.",
//             "c": "Implement a Workflow Rule with Outbound Messaging to send SOAP messages to the designated endpoint"
//         },
//         "correctAnswer": "c",
//         "explanation": "Given the 'low-code' requirement, Outbound Messaging is a strong candidate as it is a declarative feature. Although Outbound Messaging sends SOAP messages and the requirement specifies a REST endpoint, it's common for middleware to act as a protocol bridge, accepting the SOAP message from Salesforce and transforming it into the REST request the ERP requires. This fulfills the low-code, near-real-time requirements from the Salesforce perspective. A record-triggered Flow would be the more modern low-code solution, but Outbound Messaging is a classic answer for this pattern.",
//         "multiSelect": false
//     },
//     {
//         "question": "Northern Trail Outfitters uses a custom Java application to display code coverage and test results for all of its enterprise applications and plans to Include Salesforce as well. Which Salesforce API should an integration architect use to meet the requirement?",
//         "answers": {
//             "a": "Analytics REST API",
//             "b": "Metadata API",
//             "c": "Tooling API"
//         },
//         "correctAnswer": "c",
//         "explanation": "The **Tooling API** is specifically designed for building development tools that interact with Salesforce metadata. It provides access to information about Apex code, test execution results, and code coverage (`ApexCodeCoverageAggregate`, `ApexTestResult` objects), making it the ideal choice for an external application that needs to monitor Salesforce development artifacts.",
//         "multiSelect": false
//     },
//     {
//         "question": "Service agents at Northern Trall Outfitters use Salesforce to manage cases and B2C Commerce for ordering. Which integration solution should an architect recommend in order for the service agents to see order history from a business-to-consumer (B2C) Commerce system?",
//         "answers": {
//             "a": "Salesforce B2C Commerce to Service Cloud Connector",
//             "b": "REST API offered by Commerce Platform",
//             "c": "MuleSoft Anypoint Platform"
//         },
//         "correctAnswer": "a",
//         "explanation": "When an official, pre-built connector exists for a common use case between two Salesforce products, it is generally the best choice. The **Salesforce B2C Commerce to Service Cloud Connector** is a managed package designed for this exact purpose, providing a faster, more reliable, and feature-complete solution than building a custom integration from scratch using REST APIs or middleware.",
//         "multiSelect": false
//     },
//     {
//         "question": "Northern Trall Outfitters (NTO) has an affiliate company that would like immediate notifications of changes to opportunities in the INTO Salesforce instance. The affliate company has Comet client available Which solution is recommended in order to meet the requirement?",
//         "answers": {
//             "a": "Create a connected app in the affiliate org and select \"Accept Comet API Requests",
//             "b": "Create a PushTopic update event on the Opportunity object to alloy the subscriber to react to the streaming API",
//             "c": "Implement a polling mechanism in the client that calls the SOAP API getUpdated method to get the ID values of each updated record."
//         },
//         "correctAnswer": "b",
//         "explanation": "The keywords are \"immediate notifications\" and \"CometD client\". Salesforce's Streaming API uses the CometD protocol to push notifications to subscribed clients in near-real-time. A **PushTopic** allows you to define a SOQL query on an object (like Opportunity), and any record change that matches the query criteria will trigger a notification event to be sent to the subscriber.",
//         "multiSelect": false
//     },
//     {
//         "question": "Northern Trall Outfitters has a registration system that is used for workshops offered at its conferences. Attendees use Salesforce Community to register for workshops, but the scheduling system manages workshop availability based on room capacity. It is expected that there will be a big surge of requests for workshop reservations when the conference schedule goes ve Which integration pattern should be used to manage the influx in registrations?",
//         "answers": {
//             "a": "Remote Process Invocation Request and Reply",
//             "b": "Remote Process Invocation Fire and Forget",
//             "c": "Batch Data Synchronization"
//         },
//         "correctAnswer": "b",
//         "explanation": "A large surge of requests can overwhelm a system if every request requires a synchronous response. The **Remote Process Invocation - Fire and Forget** pattern is ideal for this scenario. Salesforce can accept the registration request, quickly fire it off to the external scheduling system without waiting for a final confirmation, and immediately update the UI for the user. This decouples the systems, allowing Salesforce to remain responsive under high load while the external system processes the queued requests at its own pace.",
//         "multiSelect": false
//     },
//     {
//         "question": "A company needs to integrate a legacy on-premise application that can only support SOAP API. After the integration architect evaluates the requirements and volume, they determine that the Fire and Forget integration pattern will be most appropriate for sending data from Salesforce to the external application and getting response back in a strongly-typed format. Which integration capabilities should be used to integrate the two systems?",
//         "answers": {
//             "a": "Platform Events for Salesforce to Legacy System direction and SOAP AFI using Enterprise WSDL for the communication back from legacy system to Salesforce",
//             "b": "Outbound Messaging for Salesforce to Legacy System direction and SOAP API using Partner Web Services Description Language (WSDL) for the communication back from legacy system to Salesforce",
//             "c": "Outbound Messaging for Salesforce to Legacy System direction and SOAP API using Enterprise WSDL for the communication back from legacy system to Salesforce"
//         },
//         "correctAnswer": "c",
//         "explanation": "This solution correctly pairs Salesforce features with the requirements. \n1. **Salesforce to Legacy**: **Outbound Messaging** is the perfect declarative, 'Fire and Forget' mechanism for sending SOAP messages to an external system. The Partner WSDL is loosely-typed.",
//         "multiSelect": false
//     }
//     ,
//     {
//         "question": "Northern Trall Outfitters requires an Integration to be set up between one of its Salesforce orge and an External Data Source using Salesforce Connect. The External Data Source supports Open Data Protocol. Which configuration should an integration architect recommend be implemented in order to secure requests coming from Salesforce?",
//         "answers": {
//             "a": "Configure Special Compatibility for OData connection.",
//             "b": "Configure CSRF Protection for ODate connection.",
//             "c": "Configure Identity Type for OData connection."
//         },
//         "correctAnswer": "c",
//         "explanation": "To secure outbound requests from Salesforce Connect, the primary configuration is the **Identity Type**. This setting determines how Salesforce authenticates to the external system. The options ('Per User' or 'Named Principal') allow the architect to define whether each user's identity is passed through or if a single, shared identity is used for the integration. This is the fundamental step for establishing a secure authentication handshake.",
//         "multiSelect": false
//     },
//     {
//         "question": "Northern Trail Outfitters (NTO) has recently changed Its Corporate Security Guidelines. The guidelines require that all cloud applications pass through a secure firewall before accessing on-premise resources. NTD is evaluating middleware solutions to integrate cloud applications with on-premise resources and services Which consideration should an Integration architect evaluste before choosing a middleware solution?",
//         "answers": {
//             "a": "The middleware solution enforces the OAuth security protocol.",
//             "b": "The middleware solution is able to interface directly with databases vie an Open Database Connectivity (ODBC) connection string.",
//             "c": "The middleware solution is capable of establishing a secure API Gateway between cloud applications and on-premise resources."
//         },
//         "correctAnswer": "c",
//         "explanation": "The core requirement is to create a secure, managed entry point from the cloud to on-premise systems. A middleware solution that provides or functions as an **API Gateway** directly addresses this. An API Gateway is designed to be the secure front door, managing traffic, enforcing security policies, and routing requests from external applications (like Salesforce) to the appropriate internal, on-premise resources, aligning perfectly with the corporate security guidelines.",
//         "multiSelect": false
//     },
//     {
//         "question": "A company accepts payment requests 24/7. Once the company accepts a payment request, its service level agreement (SLA) requires it to make sure each payment request is processed by its Payment System. The company encounters intermittent update errors when two or more processes try to update the same Payment Request record at the same time. Which recommendation should an integration architect make to Improve the company's SLA and update conflict handling?",
//         "answers": {
//             "a": "Payment System and Middleware should automatically retry requests.",
//             "b": "Middleware should coordinate request delivery and payment processing.",
//             "c": "Data Entry Point and Middleware should automatically retry requests."
//         },
//         "correctAnswer": "b",
//         "explanation": "The root cause of the problem is a race condition leading to update conflicts. Simply retrying requests will likely worsen the issue. The middleware, as the central orchestrator, is in the ideal position to solve this. It should be enhanced to **coordinate** the entire process, for example by using a transactional queue, implementing a record-locking strategy, or managing the state of the payment request to ensure that only one process can update the record at any given time.",
//         "multiSelect": false
//     },
//     {
//         "question": "Northan Trail Outfitters needs to send order and line items directly to an existing finance application webservice when an order is fulfilled. It is critical that each order reach the finance application exactly once for accurate inveicing. Which solution should en architect propose?",
//         "answers": {
//             "a": "Button press invokes synchronous callout, with user handling retries in case of error",
//             "b": "Trigger makes @future Apex method, with custom error handling process",
//             "c": "Trigger Invokes Queueable Apes method, with custom error handling process"
//         },
//         "correctAnswer": "c",
//         "explanation": "For guaranteed, 'exactly-once' delivery, **Queueable Apex** is the superior choice. It's an asynchronous process that can be initiated by a trigger. Unlike `@future` methods, Queueable Apex provides a Job ID for tracking, supports complex object types, and allows for job chaining. This enables the creation of a robust custom error handling and retry mechanism that can track the job's status and ensure the callout is successfully completed, which is critical for a financial transaction.",
//         "multiSelect": false
//     },
//     {
//         "question": "Northern Trall Outfitters submits orders to the manufacturing system web service. Recently, the system has experienced outages that keep service unavailable for several days. Which solution should an integration architect recommend to handle errors during these types of service outages?",
//         "answers": {
//             "a": "Use middleware queuing and buffering to insulate Salesforce from system outages.",
//             "b": "Use Outbound Messaging to automatically retry failed service calls.",
//             "c": "Use Platform Event replayId and custom scheduled Apex process to retrieve missed events."
//         },
//         "correctAnswer": "a",
//         "explanation": "For prolonged outages lasting 'several days', Salesforce-native retry mechanisms (like Outbound Messaging which retries for 24 hours) are insufficient. The best practice is to use **middleware with a durable queue**. Salesforce can send the message to the middleware and consider the job done. The middleware then takes on the responsibility of persistently retrying the delivery to the manufacturing system for as long as it takes for the system to come back online, effectively insulating Salesforce from the external system's downtime.",
//         "multiSelect": false
//     },
//     {
//         "question": "A customer's enterprise architect has identified requirements around caching, queuing, error handling, alerts, retries, event handling, etc. The company has asked the integration architect to help fulfill such aspects with its Salesforce program. Which recommendation should the integration architect make?",
//         "answers": {
//             "a": "Transform a Fire and Forget mechanism to Request and Reply, which should be handled by middleware tools (like ETL/ESB) to Improve performance.",
//             "b": "Event handling in a publish/subscribe scenario; the middleware can be used to route requests or messages to active data-event subscribers from active data-event publishers.",
//             "c": "Message transformation and protocol translation should be done within Salesforce."
//         },
//         "correctAnswer": "b",
//         "explanation": "The list of requirements (queuing, error handling, retries, event handling) describes the core capabilities of a middleware platform or Enterprise Service Bus (ESB). Recommending that middleware be used for a **publish/subscribe pattern** is a sound architectural choice. This pattern inherently supports event handling and can be combined with other middleware features like durable queues and retry policies to fulfill all the listed requirements, while decoupling Salesforce from the complexities of the integrations.",
//         "multiSelect": false
//     },
//     {
//         "question": "A subscription-based media company's system landscape forces many subscribers to maintain multiple accounts and to log in more than once. An Identity and Access Management (IAM) system, which supports SAML and Openld, was recently implemented to improve the subscrber expertence through self-registration and single sign-on (SSO). The IAM system must integrate with Salesforce to give new self-service customers instant access to Salesforce Community Cloud. which requirement should Salesforce Community Cloud support for self-registration and SS0?",
//         "answers": {
//             "a": "SAML SSO and Registration Handler",
//             "b": "SAML SSO and Just-in-Time (JIT) provisioning",
//             "c": "Openid Connect Authentication Provider and JIT provisioning"
//         },
//         "correctAnswer": "b",
//         "explanation": "The key is providing 'instant access' to new users via SSO. This is achieved with **SAML SSO** for the authentication handshake and **Just-in-Time (JIT) provisioning**. When a new user logs in for the first time via the IAM, JIT provisioning uses the information in the SAML assertion to automatically create a user record for them in Salesforce on the fly, granting them immediate access without a separate registration process.",
//         "multiSelect": false
//     },
//     {
//         "question": "A business requires automating the check and updating of the phone number type classification (mobile vs. landline) for all Incoming calls delivered to its phone sales agents. The following conditions exist: 1. At peak, the call center can receive up to 100,000 calls per day. 2. The phone number type classification is a service provided by an external service API. 3. Business is flexible with timing and frequency to check and update the records (throughout the night or every 6-12 hours is sufficient). A Remote-Call-In pattern and/or Batch Synchronization (Replication via ETL: System -> Salesforce) are determined to work with a middleware hosted on customer premise. In order to implement these patterns arid mechanisms, which component should an integration architect recommand?",
//         "answers": {
//             "a": "An API Gateway that authenticates requests from Salesforce into the middleware (ETL/ESB)",
//             "b": "Remote Site Settings configured in Salesforce to authenticate the middleware",
//             "c": "ConnectedApp configured in Salesforce to authenticate the middlewars"
//         },
//         "correctAnswer": "c",
//         "explanation": "The scenario describes a 'Remote Call-In' pattern where the middleware is initiating API calls *into* Salesforce. To securely authenticate an external application making inbound API calls, the standard best practice is to configure a **Connected App** in Salesforce. The Connected App defines the integration's access policies, including which OAuth flows are permitted and what permissions the integration has, providing a secure and manageable entry point for the middleware.",
//         "multiSelect": false
//     },
//     {
//         "question": "A company captures orders and needs to send them to the Order fulfillment system. The user is not required to have confirmation from the Order fuifiliment system. Which system constraint question should be considered when designing an integration to send orders from Salesforce to a fulfillment system?",
//         "answers": {
//             "a": "What latency is acceptable for orders to reach the fulfillment system?",
//             "b": "Which system will validate order shipping addresses?",
//             "c": "Can the fulfillment system implement a contract-first Outbound Messaging interface?"
//         },
//         "correctAnswer": "a",
//         "explanation": "When designing an integration, understanding the non-functional requirements is as crucial as the functional ones. Since this is a one-way integration, asking about the acceptable **latency** is a key design question. The answer determines the required timeliness of the integration and heavily influences the technology choice – for example, whether a near-real-time event-based solution is needed or if a less frequent batch synchronization is sufficient.",
//         "multiSelect": false
//     },
//     {
//         "question": "An enterprise customer with more than 10 million customers has the following systems in its landscape: 1. Enterprise Billing System (EBS) - All customers' monthly billing is generated by this system. 2. Enterprise Document Management System (DMS)-Bilis malled to customers are maintained in the Document Management system, 3. Salesforce CRM (CRM)-Customer information, sales, and support information is maintained in the CRM. Only authorized users are allowed access to the EBS and the Enterprise DMS, Customers call Customer Support when they need clarification on their bilis. Customer Support needs seamless access to customer billing information from the EBS and to view generated bills from the DMS. Which authorization and authentication need should an integration consultant consider while integrating the DMS and EBS with Salesforce?",
//         "answers": {
//             "a": "Identify options to maintain DMS and EBS authentication and authorization details in Salesforce.",
//             "b": "Consider Enterprise security needs for access to DMS and EBS..",
//             "c": "Consider options to migrate DMS and EBS into Salesforce."
//         },
//         "correctAnswer": "b",
//         "explanation": "The EBS and DMS are established systems with their own security models. Before designing any technical solution, the integration consultant's primary responsibility is to understand and respect the existing **Enterprise security needs**. This involves discovering how these systems handle authentication and authorization and ensuring the integration pattern (e.g., user identity propagation vs. a single integration user) aligns with the company's security policies for accessing sensitive billing and document data.",
//         "multiSelect": false
//     },
//     {
//         "question": "Northern Trail Outfitters is creating a distributable Salesforce peckage for other Salesforce orgs within the company. The package needs to call into a custom Apex REST endpoint in the central org. The security team wants to ensure a specific integration account is used in the central org that they will authorize after installation of the package. Which item should an architect recommend to secure the integration in the package?",
//         "answers": {
//             "a": "Contact Salesforce Support and create a case to temporarily enable API access for managed packages",
//             "b": "Create a connected sop in the central org and add the callback URL for each org in the package it is installed in to redirect after a successful suthentication",
//             "c": "Use an encrypted field to store the password that the security team enters, and use password management for external orgs and set the encryption method to TLS 1.2."
//         },
//         "correctAnswer": "b",
//         "explanation": "This describes a server-to-server integration that should be secured using OAuth 2.0. The central org should host a **Connected App**. The distributable package will contain the necessary logic to initiate an OAuth flow (like JWT Bearer or Web Server). After installation, an admin in the subscriber org will authorize the connection. This process securely provides the package with an access token to make authenticated callouts to the central org's REST endpoint, without ever exposing or storing raw credentials in an insecure way.",
//         "multiSelect": false
//     },
//     {
//         "question": "Northern Thall Outfitters (INTO) wants to Improve the quality of callouts from Salesforce to its REST APIs. For this purpose, NTO will require all AP clients/consumers to adhere to REST API Markup Language (RAML) specifications that include the field-level definition of every API request and response payload. The RAML specs serve as interface contracts that Apex REST API Clients can rely on. Which design specification should the integration architect include in the integration architecture to ensure that Apex REST API Clients unit tests confirm adherence to the RAIL specs?",
//         "answers": {
//             "a": "Require the Apex REST API Clients to implement the HttpCallouttock",
//             "b": "Call the HttpCalloutMock Implementation from the Apex REST API Clients",
//             "c": "Implement HttpCallout Mack to retum responses per RAML specification."
//         },
//         "correctAnswer": "c",
//         "explanation": "To properly test an Apex REST client, unit tests must simulate the external service's behavior. The most critical design specification is to ensure that the **HttpCalloutMock implementation returns responses that precisely match the RAML contract**. This means creating mock responses for various scenarios (successes, errors) with the exact JSON structure, fields, and data types defined in the RAML. This allows the unit tests to verify that the Apex client can correctly parse and handle any valid response that the real API might send.",
//         "multiSelect": false
//     }
//     ,
//     {
//         "comment": "// Question 1",
//         "question": "A company that is a leading provider of training delivers courses to students globally. The company decided to use Customer Community in order to allow students to log in to the community, register for courses and pay course fees. The company has a payment gateway that takes more than 30 seconds to process the payment transaction. Students would like to get the payment result in real-time so in case an error happens, the students can retry the payment process. What is the recommended integration approach to process payments based on this requirement?",
//         "answers": {
//             "a": "Use Continuation to process payment to the payment gateway.",
//             "b": "Use Platform Events to process payment to the payment gateway.",
//             "c": "Use Change Data Capture to process payment to the payment gateway.",
//             "d": "Use Request and Reply to make an API call to the payment gateway."
//         },
//         "correctAnswer": "a",
//         "explanation": "Standard synchronous callouts from a UI have short timeout limits and would lock up the user's screen for the duration of the call. The Continuation framework is specifically designed for long-running callouts initiated from a UI context. It makes the callout asynchronously, freeing up the server and the UI, and then processes the response using a callback method, which provides a seamless, real-time-like experience for the user without hitting governor limits.",
//         "multiSelect": false
//     },
//     {
//         "comment": "// Question 2",
//         "question": "Northern Trail Outfitters (NTO) has recently changed its Corporate Security Guidelines. The guidelines require that all cloud applications pass through a secure firewall before accessing on-premise resources. NTO is evaluating middleware solutions to integrate cloud applications with on-premise resources and services. Which two considerations should an integration architect evaluate before choosing a middleware solution?",
//         "answers": {
//             "a": "the middleware solution is able to interface directly with databases via an Open Database Connectivity (ODBC) connection string.",
//             "b": "the middleware solution is capable of establishing a secure API Gateway between cloud applications and on premise resources.",
//             "c": "the middleware solution enforces the OAuth security protocol.",
//             "d": "An API Gateway component is deployable behind a Demilitarized Zone (DMZ) or perimeter network."
//         },
//         "correctAnswer": [
//             "b",
//             "d"
//         ],
//         "explanation": "The core requirement is to securely broker communications between the cloud and on-premise systems. An API Gateway is the standard pattern for managing and securing this access. Placing this gateway in a DMZ (a perimeter network) is a standard security architecture that allows controlled traffic from the public internet to the gateway, which then securely communicates with internal, on-premise systems. This design directly addresses the need to pass through a secure firewall.",
//         "multiSelect": true
//     },
//     {
//         "comment": "// Question 3",
//         "question": "The URL for an external service has been changed without prior notice. The service provides up-to-date money exchange rates that are accessed several times from Salesforce and is a business critical function for end users. Which two solutions should an integration architect recommend be implemented to minimize potential downtime for users in this situation?",
//         "answers": {
//             "a": "Content Security Policies",
//             "b": "Enterprise Service Bus (ESB)",
//             "c": "Remote Site Settings",
//             "d": "Named Credentials"
//         },
//         "correctAnswer": [
//             "b",
//             "d"
//         ],
//         "explanation": "Named Credentials abstract the endpoint URL and authentication details from Apex code. If the URL changes, an admin can update the Named Credential in Setup without any code changes, minimizing downtime. An Enterprise Service Bus (ESB) or other middleware acts as an intermediary. Salesforce calls a stable middleware endpoint, and the middleware calls the external service. If the external service's URL changes, the configuration is updated only in the middleware, and the Salesforce integration remains untouched.",
//         "multiSelect": true
//     },
//     {
//         "comment": "// Question 4",
//         "question": "An architect decided to use Platform Events for integrating Salesforce with an external system for a company. Which three things should an architect consider when proposing this type of integration mechanism?",
//         "answers": {
//             "a": "Salesforce needs to be able to store information about the external system in order to know which event to send out.",
//             "b": "Error handling must be performed by the remote service because the event is effectively handed off to the remote system for further processing.",
//             "c": "To subscribe to an event, the integration user in Salesforce needs Read access to the event entity.",
//             "d": "External system needs to have the same uptime in order to be able to keep up with Salesforce Platform Events.",
//             "e": "To publish an event, the integration user in Salesforce needs to create permissions on the event entity."
//         },
//         "correctAnswer": [
//             "b",
//             "c",
//             "e"
//         ],
//         "explanation": "Platform Events use a fire-and-forget pattern, decoupling the publisher from subscribers. This means the subscribing remote service is responsible for its own error handling. To interact with the event object, standard Salesforce permissions apply: the integration user needs 'Create' permission on the platform event's object to publish events and 'Read' permission to subscribe to them.",
//         "multiSelect": true
//     },
//     {
//         "comment": "// Question 5",
//         "question": "Universal Containers (UC) is a leading provider of management training globally. UC requested students' course registration data generated from the Salesforce student community to be synced with the learning management system (LMS). Any update to the course registration data needs to be reflected in the LMS. Which integration mechanism should be used to meet the requirement?",
//         "answers": {
//             "a": "Platform Event",
//             "b": "Outbound Message",
//             "c": "Change Data Capture (CDC)",
//             "d": "Streaming API"
//         },
//         "correctAnswer": "c",
//         "explanation": "Change Data Capture (CDC) is specifically designed to publish events for creates, updates, deletes, and undeletes on Salesforce records. It's the ideal choice when an external system needs to be kept in sync with data changes in Salesforce as it provides detailed information about what changed and ensures transactional data consistency.",
//         "multiSelect": false
//     },
//     {
//         "comment": "// Question 6",
//         "question": "What is the first thing an integration architect should validate if a callout from a Lightning Web Component to an external endpoint is failing?",
//         "answers": {
//             "a": "The endpoint URI has been added to Remote Site Settings.",
//             "b": "The endpoint URI has been added to Content Security Policies.",
//             "c": "The endpoint domain has been added to Cross Origin Resource Sharing.",
//             "d": "The endpoint URI has been added been to an outbound firewall rule."
//         },
//         "correctAnswer": "c",
//         "explanation": "When a Lightning Web Component (LWC) running in a browser makes a direct call to an external API, it is subject to the browser's same-origin policy. To allow this, the external server must be configured for Cross-Origin Resource Sharing (CORS) and explicitly permit requests from the Salesforce domain. Remote Site Settings apply to server-side (Apex) callouts, not client-side LWC callouts.",
//         "multiSelect": false
//     },
//     {
//         "comment": "// Question 7",
//         "question": "Northern Trail Outfitters (NTO) has an integration set up between a Salesforce org and a quoting system. NTO would like to show a notification to all sales representatives that use Salesforce anytime the quoting system will be taken down for maintenance. Which Salesforce API should an integration architect use to fulfill this requirement?",
//         "answers": {
//             "a": "Streaming API",
//             "b": "Connect REST API",
//             "c": "REST API",
//             "d": "Tooling API"
//         },
//         "correctAnswer": "b",
//         "explanation": "The Connect REST API provides programmatic access to Salesforce features like Chatter, communities, and notifications. To send a custom notification to users that appears within the Salesforce UI (via the bell icon), you would use the Connect API's notification resources. This is the intended API for triggering in-app user notifications.",
//         "multiSelect": false
//     },
//     {
//         "comment": "// Question 8",
//         "question": "A large enterprise customer has decided to implement Salesforce as their CRM. The current system landscape includes: 1. An Enterprise Resource Planning (ERP) solution that is responsible for Customer invoicing and order fulfillment. 2. A Marketing solution they use for email campaigns. The enterprise customer needs their sales and service associates to use Salesforce to view and log their interactions with customers and prospects in Salesforce. Which system should be the system of record for their customers and prospects?",
//         "answers": {
//             "a": "Marketing with all customer data from Salesforce and ERP.",
//             "b": "Salesforce with relevant Marketing and ERP information.",
//             "c": "New Custom Database for customers and prospects.",
//             "d": "ERP with all prospect data from Marketing and Salesforce."
//         },
//         "correctAnswer": "b",
//         "explanation": "The primary purpose of a CRM system is to provide a central hub for all customer information and interactions. Therefore, Salesforce should be designated as the system of record for the core customer and prospect data (e.g., Accounts, Contacts). Data from other systems, like order history from the ERP, should be synchronized or virtualized into Salesforce to enrich this 360-degree customer view.",
//         "multiSelect": false
//     },
//     {
//         "comment": "// Question 9",
//         "question": "Which Web Services Description Language (WSDL) should an architect consider when creating an integration that might be used for more than one Salesforce org and different metadata?",
//         "answers": {
//             "a": "Corporate WSDL",
//             "b": "Enterprise WSDL",
//             "c": "Partner WSDL",
//             "d": "SOAP API WSDL"
//         },
//         "correctAnswer": "c",
//         "explanation": "The Enterprise WSDL is strongly typed and is bound to a specific Salesforce org's metadata; it will change if custom objects or fields are modified. The Partner WSDL is loosely typed and static, meaning it can be used to interact with any Salesforce org, regardless of its unique metadata. For an application intended to work across multiple, different orgs, the Partner WSDL is the correct choice.",
//         "multiSelect": false
//     },
//     {
//         "comment": "// Question 10",
//         "question": "Northern Trail Outfitters has had an increase in requests from other business units to integrate opportunity information with other systems from Salesforce. The developers have started writing asynchronous @future callouts directly into the target systems. The CIO is concerned about the viability of this approach, scaling for future growth, and has requested a solution recommendation. What should be done to mitigate the CIO's concerns?",
//         "answers": {
//             "a": "Refactor the existing future methods to use Enhanced External Services, import Open API 2.0 schemas and update flows to use services instead of Apex.",
//             "b": "Develop a comprehensive catalog of Apex classes to eliminate the need for redundant code and use custom metadata to hold the endpoint information for each integration.",
//             "c": "Implement an extract, transform, load (ETL) tool and perform nightly batch data loads to reduce network traffic using last modified dates on the Opportunity object to extract the right records.",
//             "d": "Implement an Enterprise Service Bus for service orchestration, mediation, routing and decouple dependencies across systems."
//         },
//         "correctAnswer": "d",
//         "explanation": "The current point-to-point approach creates a tightly coupled architecture that is difficult to manage and scale. Implementing an Enterprise Service Bus (ESB) or a middleware platform decouples Salesforce from the end systems. Salesforce sends a single message to the ESB, and the ESB handles the complex logic of routing, transformation, and delivery to multiple target systems. This creates a much more scalable, manageable, and resilient architecture.",
//         "multiSelect": false
//     },
//     {
//         "comment": "// Question 11",
//         "question": "Northern Trail Outfitters wants to use Salesforce as a front end for creating accounts using the lead-to-opportunity process. 1. An order is created in Salesforce when the opportunity is Closed/Won, but the back-end Enterprise Resource Planning (ERP) system is the data master for order. 2. Customer wants to be able to see within Salesforce all the stages of order processing like Order Created, Order Shipped, and Order Paid that are within the retention window. Which two message durability considerations should an integration architect make when designing a solution to meet these business requirements?",
//         "answers": {
//             "a": "When subscribing to Salesforce Event Bus, ReplayID is used with a value of -2 to be able to see old and new events.",
//             "b": "When subscribing to Salesforce Event Bus, ReplayID is used with a value of -1 to be able to see new events.",
//             "c": "High-volume event messages are stored for 72 hours (3 days).",
//             "d": "High-volume event messages are stored for 24 hours (1 day)."
//         },
//         "correctAnswer": [
//             "a",
//             "c"
//         ],
//         "explanation": "The Salesforce Event Bus retains events, allowing subscribers to retrieve messages they may have missed while disconnected. High-volume platform events are retained for 72 hours (3 days). To retrieve all available events within this retention window (both past and new), a subscriber connects using a ReplayID of -2. A ReplayID of -1 would only deliver new events published after the client connects.",
//         "multiSelect": true
//     },
//     {
//         "comment": "// Question 12",
//         "question": "Universal Containers (UC) is a large printing company that sells advertisement banners. The company works with third-party agents on banner initial design concepts. The design files are stored in an on-premise file store that can be accessed by UC internal users and third party agencies. UC would like to collaborate with the third-party agencies on the design files and allow them to view the design files in the community. The conceptual design files size is 2.5 GB. Which solution should an integration architect recommend?",
//         "answers": {
//             "a": "Create a Lightning component with a Request and Reply integration pattern to allow the community users to download the design files.",
//             "b": "Define an External Data Source and use Salesforce Connect to upload the files to an external object. Link the external object using Indirect lookup.",
//             "c": "Create a custom object to store the file location URI; when a community user clicks on the file URL, redirect the user to the on-premise system file location.",
//             "d": "Use Salesforce Files to link the files to Salesforce records and display the record and the files in the community."
//         },
//         "correctAnswer": "c",
//         "explanation": "Storing a 2.5 GB file directly in Salesforce is impractical and would quickly consume storage limits. The most efficient solution is to keep the file in the on-premise system of record. By storing the URL to the file in a Salesforce record and providing that link to community users, they can be redirected to the on-premise system to download the file directly. This leverages the existing file store without moving large data.",
//         "multiSelect": false
//     },
//     {
//         "comment": "// Question 13",
//         "question": "Northern Trail Outfitters has recently implemented middleware for orchestration of services across platforms. The Enterprise Resource Planning (ERP) system being used requires transactions be captured near real time at a REST endpoint initiated in Salesforce when creating an order object. Additionally, the Salesforce team has limited development resources and requires a low-code solution. Which two options will fulfill the use case requirements?",
//         "answers": {
//             "a": "Use Process Builder to create a platform event, selecting the record type as the platform event name on insert of record.",
//             "b": "Implement Change Data Capture on the order object and leverage the replay ID in the middleware solution.",
//             "c": "Implement a Workflow Rule with Outbound Messaging to send SOAP messages to the designated endpoint.",
//             "d": "Use Remote Process Invocation Fire and Forget pattern on insert on the order object using Flow Builder."
//         },
//         "correctAnswer": [
//             "b",
//             "d"
//         ],
//         "explanation": "The requirements are near real-time, low-code, and a REST endpoint. Change Data Capture (CDC) is a low-code (declarative) feature that pushes record changes in near real-time to a message bus, which the middleware can subscribe to. Flow Builder is Salesforce's primary low-code automation tool; a record-triggered flow can be configured to make an asynchronous callout to an external REST service when an order is created. Outbound Messaging is SOAP-based, not REST.",
//         "multiSelect": true
//     },
//     {
//         "comment": "// Question 14",
//         "question": "Northern Trail Outfitters' Enterprise Resource Planning (ERP) system is integrated with Salesforce and syncs several million contacts per day. To prevent specific data from syncing, the integration uses a SOQL query filtered by sharing hierarchy. Which two things should an architect do to improve the performance of the integration?",
//         "answers": {
//             "a": "Remove the sharing restrictions.",
//             "b": "Remove the query filters.",
//             "c": "Include selective criteria in query filters.",
//             "d": "Include non-selective criteria in query filters."
//         },
//         "correctAnswer": [
//             "a",
//             "c"
//         ],
//         "explanation": "Queries that depend on sharing rules are notoriously slow with large data volumes because the database must calculate visibility for every record. Removing the sharing restrictions for the integration user (e.g., by giving them 'View All Data' permission) allows the query to bypass these expensive calculations. Additionally, ensuring the query's WHERE clause uses selective criteria (indexed fields that narrow the result set) is a fundamental best practice for optimizing any SOQL query.",
//         "multiSelect": true
//     },
//     {
//         "comment": "// Question 15",
//         "question": "A company needs to integrate a legacy on-premise application that can only support SOAP API. After the integration architect has evaluated the requirements and volume, they determined that the Fire and Forget integration pattern will be most appropriate for sending data from Salesforce to the external application and getting response back in a strongly-typed format. Which integration capabilities should be used to integrate the two systems?",
//         "answers": {
//             "a": "Platform Events for Salesforce to Legacy System direction and SOAP API using Partner WSDL for the communication back from legacy system to Salesforce.",
//             "b": "Platform Events for Salesforce to Legacy System direction and SOAP API using Enterprise WSDL for the communication back from legacy system to Salesforce.",
//             "c": "Outbound Messaging for Salesforce to legacy System direction and SOAP API using Partner Web Services Description Language (WSDL) for the communication hack from legacy system to Salesforce.",
//             "d": "Outbound Messaging for Salesforce to Legacy System direction and SOAP API using Enterprise WSDL for the communication back from legacy system to Salesforce."
//         },
//         "correctAnswer": "d",
//         "explanation": "Outbound Messaging is a declarative 'fire-and-forget' mechanism that sends a SOAP message to an endpoint when a record changes, fitting the Salesforce-to-legacy requirement. For the return communication, the SOAP API is appropriate. The Enterprise WSDL is strongly typed, meaning it's specific to the Salesforce org's schema, which aligns with the requirement for a 'strongly-typed format'.",
//         "multiSelect": false
//     },
//     {
//         "comment": "// Question 16",
//         "question": "A large enterprise customer with the following system landscape is planning to implement Salesforce Sales Cloud. [Diagram shows ERP connected to MDM, Invoices System, Inventory, and Pricing Engine]. The following business processes need to be supported in Salesforce: 1. Sales consultants should be able to have access to current inventory. 2. The ERP System is the system of record for pricing information. 3. Quotes should be generated in Salesforce with pricing from ERP. 4. Sales Management uses an Enterprise BI tool to view Sales dashboards. 5. MDM is the system of record for customers and prospects. 6. Invoices should be accessible in Salesforce. Which systems in the landscape should the integration consultant consider to be integrated with Salesforce to support the business requirements?",
//         "answers": {
//             "a": "ERP, MDM, BI tool, Data Warehouse",
//             "b": "ERP, MDM, Data Warehouse, Invoices system",
//             "c": "ERP, Invoices system, Data Warehouse, BI tool",
//             "d": "ERP, Inventory, Pricing Engine, Invoices system"
//         },
//         "correctAnswer": "b",
//         "explanation": "To meet the requirements, Salesforce must integrate with: MDM (for customers), ERP (for pricing), the Invoices System (to view invoices), and Inventory (often accessed via the ERP). Additionally, sales data from Salesforce must be sent to a Data Warehouse for the BI tool to use. Option B (ERP, MDM, Data Warehouse, Invoices system) covers the most critical integration points needed to fulfill the stated business processes.",
//         "multiSelect": false
//     },
//     {
//         "comment": "// Question 17",
//         "question": "A large enterprise customer operating in a highly regulated industry is planning to implement Salesforce for customer-facing associates in both sales and service, as well as back-office staff. The business processes that Salesforce supports are critical to the business. Salesforce will be integrated into multiple back-office systems to provide a single interface for associates. Reliability and monitoring of these integrations is required as associates support customers. Which integration solution should the architect consider when planning the implementation?",
//         "answers": {
//             "a": "Decoupling back office system callouts into separate distinct services that have inbuilt error logging and monitoring frameworks.",
//             "b": "Build a custom integration gateway to support hark-office system integrations and ensure reliability and monitoring capabilities.",
//             "c": "Use Architect Services in hark-office systems to support callouts from Salesforce and build reliability, monitoring and reporting capabilities.",
//             "d": "Leverage middleware for all back office system integrations ensuring real time alerting, monitoring and reporting capabilities."
//         },
//         "correctAnswer": "d",
//         "explanation": "For enterprise-grade integrations where reliability and monitoring are critical, using a dedicated middleware platform (like an ESB or iPaaS) is the standard best practice. Middleware is purpose-built to handle complex integrations and provides essential features like error handling, retries, message queuing, and, crucially, real-time alerting, monitoring, and reporting capabilities.",
//         "multiSelect": false
//     },
//     {
//         "comment": "// Question 18",
//         "question": "Northern Trail Outfitters uses a custom Java application to display code coverage and test results for all of its enterprise applications and plans to include Salesforce as well. Which Salesforce API should an integration architect use to meet the requirement?",
//         "answers": {
//             "a": "Metadata API",
//             "b": "SOAP API",
//             "c": "Analytics REST API",
//             "d": "Tooling API"
//         },
//         "correctAnswer": "d",
//         "explanation": "The Tooling API is specifically designed for building development tools for the Salesforce platform. It provides programmatic access to Apex classes, triggers, test execution status, and code coverage results, making it the correct API for an external application to query this type of development metadata.",
//         "multiSelect": false
//     },
//     {
//         "comment": "// Question 19",
//         "question": "Universal Containers (UC) owns a variety of cloud-based applications, including Salesforce, alongside several on-premise applications. The on-premise applications are protected behind a corporate network with limited outside access to external systems. UC would like to expose data from the on-premise applications to Salesforce for a more unified user experience. The data should be accessible from Salesforce in real time. Which two actions should be recommended to fulfill this system requirement?",
//         "answers": {
//             "a": "Develop an application in Heroku that connects to the on-premise Database vio an Open Database Connectivity (ODBC) string and Virtual Private Cloud (VPC) connection.",
//             "b": "Deploy MuleSoft to the on-premise network and design external facing APIs to expose the data.",
//             "c": "Develop custom APIs on the company's network that are invokable by Salesforce.",
//             "d": "Run a batch job with an extract, transform, load (ETL) tool from an on premise server to move data to Salesforce."
//         },
//         "correctAnswer": [
//             "b",
//             "c"
//         ],
//         "explanation": "The requirement for real-time access means the on-premise systems must expose APIs that Salesforce can call. Developing custom APIs on the company network that are securely exposed is one way to achieve this. Using a middleware platform like MuleSoft, deployed on-premise, is a more robust and scalable approach. The middleware acts as a secure API gateway, exposing data from various internal systems through managed, external-facing APIs. A batch ETL job is not real-time.",
//         "multiSelect": true
//     },
//     {
//         "comment": "// Question 20",
//         "question": "An architect is required to integrate with an External Data Source via a Named Credential with an Apex callout due to technical constraints. How is authentication achieved?",
//         "answers": {
//             "a": "Connect via Salesforce Connect.",
//             "b": "Handle authentication in the code.",
//             "c": "Handle authentication with login flows.",
//             "d": "Connect via Communities."
//         },
//         "correctAnswer": "c",
//         "explanation": "The primary benefit of Named Credentials is that Salesforce handles the authentication protocol declaratively, abstracting it from Apex code. The correct answer, 'Authentication is handled by the Named Credential configuration,' is not an option. Among the flawed choices, some complex OAuth 2.0 flows that can be configured in a Named Credential (like the JWT Bearer Flow or Authorization Code Flow) involve concepts that could be loosely associated with a 'login flow' for initial setup or token exchange, making it the most likely intended answer despite the imprecise terminology.",
//         "multiSelect": false
//     },
//     {
//         "comment": "// Question 21",
//         "question": "Northern Trail Outfitters (NTO) uses different shipping services for each of the 34 countries it serves. Services are added and removed frequently to optimize shipping times and costs. Sales representatives serve all NTO customers globally and need to select between valid service(s) for the customer's country and request shipping estimates from that service. Which two solutions should an architect propose?",
//         "answers": {
//             "a": "Invoke middleware service to retrieve valid shipping methods.",
//             "b": "Use Platform Events to construct and publish shipper-specific events.",
//             "c": "Use middleware to abstract the call to the specific shipping services.",
//             "d": "Store shipping services in a picklist that is dependent on a country picklist."
//         },
//         "correctAnswer": [
//             "a",
//             "c"
//         ],
//         "explanation": "This scenario requires a solution that can handle complexity and frequent change. A middleware layer abstracts the complexity away from Salesforce; Salesforce makes one simple call to the middleware, which then handles the logic of calling the correct, specific shipping API based on the country. The middleware is also responsible for maintaining the list of valid shipping methods for each country and providing it to Salesforce upon request. This decouples Salesforce from the volatile external services.",
//         "multiSelect": true
//     },
//     {
//         "comment": "// Question 22",
//         "question": "An integration architect needs to build a solution that will be using the Streaming API, but the data loss should be minimized, even when the client re-connects every couple of days. Which two types of Streaming API events should be considered?",
//         "answers": {
//             "a": "High Volume Platform Events",
//             "b": "Change Data Capture Events",
//             "c": "Push Topic Events",
//             "d": "Generic Events"
//         },
//         "correctAnswer": [
//             "a",
//             "b"
//         ],
//         "explanation": "Minimizing data loss over a multi-day disconnection requires event durability. Both Change Data Capture (CDC) events and High-Volume Platform Events are retained on the Salesforce event bus for up to 72 hours. This allows a disconnected client to reconnect and retrieve all events that occurred during its downtime using a replay ID. PushTopic and Generic events have a shorter, 24-hour retention window, making them less suitable for this requirement.",
//         "multiSelect": true
//     },
//     {
//         "comment": "// Question 23",
//         "question": "Sales representatives at Universal Containers (UC) use Salesforce Sales Cloud as their primary CRM. UC owns a legacy homegrown application that stores a copy of customer data as well. Sales representatives may edit or update contact records in Salesforce if there is a change. Both Salesforce and the homegrown application should be kept synchronized for consistency. UC has the following requirements: 1. When a contact record in Salesforce is updated, the external homegrown application should be updated as well. 2. The synchronization should be event driven. 3. The integration should be asynchronous. Which option should an architect recommend to satisfy the requirements?",
//         "answers": {
//             "a": "Leverage Platform Events to publish a custom event message containing changes to the Contact object.",
//             "b": "Write an Apex trigger with the future annotation.",
//             "c": "Use an extract, transform, load (ETL) tool to keep Salesforce and the homegrown application in sync on a regular cadence.",
//             "d": "Leverage Change Data Capture to track changes to the Contact object and write a CometD subscriber on the homegrown application."
//         },
//         "correctAnswer": "d",
//         "explanation": "This is a classic use case for Change Data Capture (CDC). It is event-driven, asynchronous, and designed to broadcast record changes to external subscribers. The homegrown application can subscribe to the Contact change event stream to receive updates in near real-time. This is more robust and purpose-built for data synchronization than using custom Platform Events or triggers.",
//         "multiSelect": false
//     },
//     {
//         "comment": "// Question 24",
//         "question": "An enterprise customer with more than 10 million customers has the following systems and conditions in their landscape: Enterprise Billing System (EBS)... Enterprise Document Management System (DMS)... Salesforce CRM... Customer Support needs seamless access to customer billing information from the EBS and to view generated bills from the DMS. Which three authorization and authentication needs should an integration consultant consider while integrating the DMS and EBS with Salesforce?",
//         "answers": {
//             "a": "Users should be authenticated into DMS and EBS without having to enter username and password.",
//             "b": "Consider Enterprise security needs for access to DMS and EBS.",
//             "c": "Users should be authorized to view information specific to the customer they are servicing without needing to search for the customer.",
//             "d": "Identify options to maintain DMS and EBS authentication and authorization details in Salesforce.",
//             "e": "Consider options to migrate DMS and EBS into Salesforce."
//         },
//         "correctAnswer": [
//             "a",
//             "b",
//             "d"
//         ],
//         "explanation": "When integrating systems, key security considerations are paramount. First, the integration must adhere to the existing enterprise security policies for the target systems (DMS and EBS). For a seamless user experience, a single sign-on (SSO) mechanism is needed so users don't have to log in again. To enable this SSO, Salesforce needs a secure way to manage the integration's credentials, for which features like Named Credentials are designed.",
//         "multiSelect": true
//     },
//     {
//         "comment": "// Question 25",
//         "question": "Northern Trail Outfitters (NTO) wants to improve the quality of call-outs from Salesforce to its REST APIs. For this purpose, NTO will require all API clients/consumers to adhere to REST API Markup Language (RAML) specifications that include field-level definition of every API request and response payload. The RAML specs serve as interface contracts that Apex REST API Clients can rely on. Which two design specifications should the integration architect include in the integration architecture to ensure that Apex REST API Clients unit tests confirm adherence to the RAML specs?",
//         "answers": {
//             "a": "Call the HttpCalloutMock implementation from the Apex REST API Clients.",
//             "b": "Implement HttpCalloutMock to return responses per RAML specification.",
//             "c": "Require the Apex REST API Clients to implement the HttpCalloutMock.",
//             "d": "Call the Apex REST API Clients in a test context to get the mock response."
//         },
//         "correctAnswer": [
//             "b",
//             "d"
//         ],
//         "explanation": "Apex tests cannot make real callouts and require a mock response. The test setup should implement the `HttpCalloutMock` interface to provide a mock HTTP response that strictly follows the structure defined in the RAML specification. The unit test method will then call the Apex client method that performs the callout. Because it's running in a test context, Salesforce intercepts the callout and provides the mock response, allowing the test to verify that the client code correctly parses the RAML-compliant response.",
//         "multiSelect": true
//     },
//     {
//         "comment": "// Question 26",
//         "question": "A global financial company sells financial products and services... The company has a state-of-the-art core banking system that is the master system to store financial transactions... processes 10 million financial transactions per day. The CTO for the company is considering building a community portal so that customers can review their bank account details, update their information and review their account financial transactions. What should an integration architect recommend as a solution to enable customer community users to view their financial transactions?",
//         "answers": {
//             "a": "Use Iframe to display core banking financial transactions data in the customer community.",
//             "b": "Use Salesforce External Service to display financial transactions in a community Lightning page.",
//             "c": "Migrate the financial transaction records to salesforce custom object and use ETL tool to keep systems in sync.",
//             "d": "Use Salesforce Connect to display the financial transactions as an external object."
//         },
//         "correctAnswer": "d",
//         "explanation": "Migrating millions of transactions per day into Salesforce is not feasible due to data storage costs and synchronization complexity. The best practice for exposing large volumes of data from an external system without copying it is Salesforce Connect (Data Virtualization). It allows you to define an external object in Salesforce that directly queries and displays the data from the core banking system in real-time, as if it were stored natively in Salesforce.",
//         "multiSelect": false
//     },
//     {
//         "comment": "// Question 27",
//         "question": "An integration architect has built a Salesforce application that integrates multiple systems and keeps them synchronized via Platform Events. What is taking place if events are only being published?",
//         "answers": {
//             "a": "The platform events are published after the Apex transaction completes.",
//             "b": "The platform events are published immediately before the Apex transaction completes.",
//             "c": "The platform events have a trigger in Apex.",
//             "d": "The platform events are being published from Apex."
//         },
//         "correctAnswer": "a",
//         "explanation": "When a platform event is published from within an Apex transaction, it is not sent to the event bus immediately. Instead, it is queued and only published after the entire Apex transaction successfully commits to the database. This transactional behavior ensures that events are not broadcast for operations that are ultimately rolled back, thus maintaining data consistency between systems.",
//         "multiSelect": false
//     },
//     {
//         "comment": "// Question 28",
//         "question": "A customer is migrating from an old legacy system to Salesforce. As part of the modernization effort, they would like to integrate all existing systems that currently work with their legacy application with Salesforce. Which three constraints and pain-points should an integration architect consider when choosing the integration pattern/mechanism?",
//         "answers": {
//             "a": "Error handling mechanisms",
//             "b": "Data volume and processing volume",
//             "c": "Multi-language and multi-currency requirement",
//             "d": "Reporting and usability requirements",
//             "e": "System types APIs, File systems, Email"
//         },
//         "correctAnswer": [
//             "a",
//             "b",
//             "e"
//         ],
//         "explanation": "When designing an integration architecture, several core non-functional requirements are critical. Data volume and frequency dictate the choice of API (e.g., REST vs. Bulk) and pattern (real-time vs. batch). The capabilities of the endpoint systems are a major constraint; you must know if they support modern APIs, can only process files, or have other limitations. A robust error handling and retry strategy is also essential for any reliable integration.",
//         "multiSelect": true
//     },
//     {
//         "comment": "// Question 29",
//         "question": "Universal Containers (UC) is a global financial company that sells financial products and services... UC's Core banking system is the system of record for bank accounts, and all accounts opened in Salesforce have to be synced in real time to the core banking system. Support agents need to inform the customers with the newly created bank account ID, which has to be generated from the core banking system. Which integration pattern is recommended for this use case?",
//         "answers": {
//             "a": "Request and Reply",
//             "b": "Outbound Message",
//             "c": "Streaming API to generate Push Topic",
//             "d": "Salesforce platform, event"
//         },
//         "correctAnswer": "a",
//         "explanation": "The key requirement is that the Salesforce user needs an immediate response (the new bank account ID) from the external system. This defines the Request and Reply (or Request-Response) pattern. Salesforce makes a synchronous call to the external system, waits for it to create the account and return the new ID, and then updates the Salesforce record with that ID. Fire-and-forget patterns like Platform Events would not work because they don't provide an immediate response back to the originating user.",
//         "multiSelect": false
//     },
//     {
//         "comment": "// Question 30",
//         "question": "Northern Trail Outfitters (NTO) has hired an integration architect to design the integrations between existing systems and a new instance of Salesforce. NTO has the following requirements: 1. Initial load of 2M Accounts, 5.5 million Contacts, 4.3 million Opportunities, and 45,000 Products into the new org. 2. Notification of new and updated Accounts and Contacts needs to be sent to three external systems. 3. Expose custom business logic to live external applications in a highly secure manner. 4. Schedule nightly automated dataflows, recipes and date syncs. Which set of APIs are recommended in order to meet the requirements?",
//         "answers": {
//             "a": "Bulk API, Chatter REST API, Apex REST API, Analytics REST API",
//             "b": "Bulk API, Chatter REST API, Apex SOAP API, Tooling API",
//             "c": "Bulk API, Streaming API, Apex SOAP API, Analytics REST API",
//             "d": "Bulk API, Streaming API, Apex REST API, Analytics REST API"
//         },
//         "correctAnswer": "d",
//         "explanation": "Breaking down the requirements: 1. Initial large data load is the primary use case for the Bulk API. 2. Notifications of record changes to external systems is the use case for the Streaming API (via Change Data Capture). 3. Exposing custom business logic securely is done by creating custom endpoints with Apex REST API. 4. Scheduling CRM Analytics (Tableau CRM) dataflows and recipes is done via the Analytics REST API.",
//         "multiSelect": false
//     },
//     {
//         "comment": "// Question 31",
//         "question": "A large business-to-consumer (B2C) customer is planning to implement Salesforce CRM to become a customer-centric enterprise. Below is their current system landscape diagram. The goals for implementing Salesforce includes: 1. Develop a 360 degree view of the customer. 2. Leverage Salesforce capabilities for marketing, sales and service processes. 3. Reuse Enterprise capabilities built for quoting and order management processes. Which three systems from the current system landscape can be retired with the implementation of Salesforce?",
//         "answers": {
//             "a": "Sales Activity System",
//             "b": "Order Management System",
//             "c": "Quoting System",
//             "d": "Email Marketing System",
//             "e": "Case Management System"
//         },
//         "correctAnswer": [
//             "a",
//             "d",
//             "e"
//         ],
//         "explanation": "The goal is to leverage Salesforce for marketing, sales, and service. Therefore, the Sales Activity System is replaced by Sales Cloud, the Email Marketing System is replaced by a tool like Marketing Cloud or Pardot, and a Case Management System is replaced by Service Cloud. The requirements explicitly state that the existing Quoting and Order Management systems will be reused, so they will not be retired.",
//         "multiSelect": true
//     },
//     {
//         "comment": "// Question 33",
//         "question": "Which two system constraint questions should be considered when designing an integration to send orders from Salesforce to a fulfillment system?",
//         "answers": {
//             "a": "Which system will validate order shipping addresses?",
//             "b": "Can the fulfillment system implement a contract first Outbound Messaging interface?",
//             "c": "Can the fulfillment system participate in idempotent design to avoid duplicate orders?",
//             "d": "What latency is acceptable for orders to reach the fulfillment system?"
//         },
//         "correctAnswer": [
//             "b",
//             "c"
//         ],
//         "explanation": "When designing an integration, understanding the target system's capabilities is critical. Asking if it can support a specific technology like contract-first SOAP (used by Outbound Messaging) determines which integration mechanisms are viable. Idempotency is a critical design concept; asking if the fulfillment system can safely receive the same message multiple times without creating duplicates is essential for building a resilient integration that can handle retries.",
//         "multiSelect": true
//     },
//     {
//         "comment": "// Question 34",
//         "question": "Universal Containers (UC) is a leading provider of management training globally. UC embarked on a Salesforce transformation journey to allow students to register for courses in the Salesforce Community. UC has a learning system that masters all courses and student registration. UC requested a near real-time feed of student registration from Salesforce to the learning system. The integration architect recommends using Salesforce Platform Events. Which API should be used for the Salesforce platform event solution?",
//         "answers": {
//             "a": "Tooling API",
//             "b": "Streaming API",
//             "c": "REST API",
//             "d": "SOAP API"
//         },
//         "correctAnswer": "b",
//         "explanation": "The Streaming API is the correct choice for subscribing to events on the Salesforce event bus, which includes Platform Events. An external client would use the Streaming API with a CometD or gRPC library to listen for the near real-time event notifications published by Salesforce.",
//         "multiSelect": false
//     },
//     {
//         "comment": "// Question 35",
//         "question": "An integration architect has designed a mobile application for Salesforce users to get data while on the road using a custom user interface (UI). The application is secured with OAuth and is currently functioning well. There is a new requirement where the mobile application needs to obtain the GPS coordinates and store them on a custom geolocation field. The geolocation field is secured with field-level security, so users can view the value without changing it. What should be done to meet the requirement?",
//         "answers": {
//             "a": "The mobile device makes a REST API inbound call.",
//             "b": "The mobile device receives a REST Apex callout call.",
//             "c": "The mobile device makes a REST Apex inbound call.",
//             "d": "The mobile device makes a SOAP API inbound call."
//         },
//         "correctAnswer": "a",
//         "explanation": "The mobile app has the GPS data and needs to send it to Salesforce. This is an inbound call from the mobile app to Salesforce. The standard way for external applications to update data is by using a standard API like the REST API. The mobile app would make an authenticated REST API call (e.g., a PATCH request to the SObject resource) to update the record. The user's field-level security permissions would be respected by the API call.",
//         "multiSelect": false
//     },
//     {
//         "comment": "// Question 36",
//         "question": "A company's security assessment noted vulnerabilities on the unmanaged packages in its Salesforce orgs, notably secrets that are easily accessible and in plain text, such as usernames, passwords, and OAuth tokens used in callouts from Salesforce. Which two persistence mechanisms should an integration architect require to be used to ensure that secrets are protected from deliberate or inadvertent exposure?",
//         "answers": {
//             "a": "Named Credentials",
//             "b": "Encrypted Custom Fields",
//             "c": "Protected Custom Metadata Types",
//             "d": "Protected Custom Settings"
//         },
//         "correctAnswer": [
//             "a",
//             "d"
//         ],
//         "explanation": "**Named Credentials** are the standard, best-practice method for storing API keys, passwords, and other secrets used in Apex callouts. They securely store the credential and endpoint URL, abstracting them from the code so they aren't visible or included in deployments. **Protected Custom Settings** are a type of custom setting where the data is not visible through the API and is only accessible by Apex code that is part of the managed package. This makes them suitable for storing secrets that need to be used programmatically within a package's namespace.",
//         "multiSelect": true
//     },
//     {
//         "comment": "// Question 37",
//         "question": "A Salesforce customer is planning to roll out Salesforce for all of their sales and service staff. Senior management has requested that monitoring be in place for Operations to notify any degradation in Salesforce performance. How should an integration consultant implement monitoring?",
//         "answers": {
//             "a": "Identity critical business processes and establish automation to monitor performance against established benchmarks.",
//             "b": "Request Salesforce to monitor the Salesforce instance and notify when there is degradation in performance.",
//             "c": "Use APIEvent to track all user initiated API calls through SOAP, REST or Bulk APIs.",
//             "d": "Use Salesforce API Limits to capture current API usage and configure alerts for monitoring."
//         },
//         "correctAnswer": "a",
//         "explanation": "Effective performance monitoring is not just about technical metrics; it's about business impact. The best approach is to first **identify the most critical business processes** (e.g., Lead Conversion, Case Creation, Opportunity Closure). Then, **establish performance benchmarks** for these processes (e.g., page load times, transaction completion times). Finally, implement automated tools (like Apex tests that run on a schedule or external monitoring services) to continuously **measure performance against these benchmarks** and alert operations when a deviation occurs.",
//         "multiSelect": false
//     },
//     {
//         "comment": "// Question 38",
//         "question": "A new Salesforce program has the following high-level abstract requirement: Business processes executed on Salesforce require data updates between their internal systems and Salesforce. Which three relevant details should a Salesforce Integration Architect seek to specifically solve for integration architecture needs of the program?",
//         "answers": {
//             "a": "Core functional and non-functional requirements for User Experience design, Encryption needs, Community, and license choices.",
//             "b": "Integration skills, SME availability, and Program Governance details.",
//             "c": "Source and Target system, Directionality, and data volume & transformation complexity, along with any middleware that can be leveraged.",
//             "d": "Integration Style Process-based, Data-based, and Virtual integration.",
//             "e": "Timing aspects, real-time/near real-time (synchronous or asynchronous), batch and update frequency."
//         },
//         "correctAnswer": [
//             "c",
//             "d",
//             "e"
//         ],
//         "explanation": "To design an integration, an architect must first gather core requirements. This includes **identifying the source and target systems, the direction of data flow, the volume of data, and any transformation logic** (Option C). They must also understand the **timing requirements**, such as whether the integration needs to be real-time (synchronous) or can be delayed (asynchronous/batch) and how frequently it needs to run (Option E). Finally, based on these requirements, the architect will determine the appropriate **integration style or pattern**, such as process-based orchestration, data synchronization, or data virtualization (Option D). These three areas form the foundation of the integration architecture.",
//         "multiSelect": true
//     },
//     {
//         "comment": "// Question 39",
//         "question": "Universal Containers has a requirement for all accounts that do NOT qualify for a business extension (custom field on the account record) for the next month to send a meeting invite to its contacts from the marketing automation system to discuss the next steps. It is estimated there will be approximately 1 million contacts per month. Which solution is recommended to use?",
//         "answers": {
//             "a": "Time-based workflow rule",
//             "b": "Trigger",
//             "c": "Process Builder",
//             "d": "Batch Apex"
//         },
//         "correctAnswer": "d",
//         "explanation": "Processing a high volume of records (1 million contacts) will exceed the governor limits of synchronous Apex triggers or declarative automation like Process Builder/Flow. **Batch Apex** is designed specifically for processing large data sets asynchronously. A scheduled Batch Apex job can query all the necessary Account and Contact records, process them in manageable chunks (batches), and make the required callouts to the marketing automation system without hitting governor limits.",
//         "multiSelect": false
//     },
//     {
//         "comment": "// Question 40",
//         "question": "Northern Trail Outfitters needs to make synchronous callouts 'available-to-promise' services to query product availability and reserve inventory during customer checkout process. Which two statements should an integration architect consider when building a scalable integration solution?",
//         "answers": {
//             "a": "The typical and worst case historical response times.",
//             "b": "How many concurrent service calls are being placed.",
//             "c": "The maximum query cursors open per user on the service.",
//             "d": "The number of batch jobs that can run concurrently."
//         },
//         "correctAnswer": [
//             "a",
//             "b"
//         ],
//         "explanation": "For a scalable synchronous integration, two key factors are latency and throughput. The architect must know the **response times of the external service** (Option A) to ensure they are fast enough to avoid Apex CPU timeouts and provide a good user experience. They must also understand the expected load, specifically **how many concurrent calls** will be made (Option B), to ensure that neither the Salesforce org nor the external service will be overwhelmed, and to stay within Salesforce's concurrent API request limits.",
//         "multiSelect": true
//     },
//     {
//         "comment": "// Question 46",
//         "question": "A developer has been tasked by the integration architect to build a solution based on the Streaming API. The developer has done some research and has found there are different implementations of the events in Salesforce (Push Topic Events, Change Data Capture, Generic Streaming, Platform Events), but is unsure of how to proceed with the implementation and asks the system architect for some guidance. What should the architect consider when making the recommendation?",
//         "answers": {
//             "a": "Apex triggers can subscribe to Generic Events.",
//             "b": "Change Data Capture can be published from Apex.",
//             "c": "PushTopic Events can define a custom payload.",
//             "d": "Change Data Capture does not have record access support."
//         },
//         "correctAnswer": "d",
//         "explanation": "This is a key consideration. Streaming events like **Change Data Capture (CDC)** publish based on record changes, and the event message is delivered to all subscribers regardless of their individual user permissions or record access in Salesforce. The subscribing system is responsible for enforcing data visibility rules if necessary. The other options are incorrect: Apex triggers cannot subscribe to any streaming events (they can only publish them), CDC events are published by the platform automatically and cannot be published from Apex, and PushTopic events have a fixed payload based on the fields in their defining SOQL query.",
//         "multiSelect": false
//     },
//     {
//         "comment": "// Question 47",
//         "question": "Northern Trail Outfitters is seeking to improve the performance and security of outbound integrations from Salesforce to on-premise servers. What should the architect consider before recommending a solution?",
//         "answers": {
//             "a": "Shield Platform Encryption limitations",
//             "b": "External gateway products in use",
//             "c": "Default gateway restrictions",
//             "d": "Considerations for using Deterministic Encryption"
//         },
//         "correctAnswer": "b",
//         "explanation": "To integrate with on-premise servers, Salesforce traffic must pass through the company's network perimeter. The architect must understand what **external gateway products** (like an API Gateway, reverse proxy, or firewall) are already in place. These gateways control traffic, enforce security policies, and often provide features like traffic shaping and protocol translation that will be central to the integration solution's design.",
//         "multiSelect": false
//     },
//     {
//         "comment": "// Question 48",
//         "question": "A subscription-based media company's system landscape forces many subscribers to maintain multiple accounts and to login more than once. An Identity and Access Management (IAM) system, which supports SAML and OpenID, was recently implemented to improve the subscriber experience through self-registration and single sign-on (SSO). The IAM system must integrate with Salesforce to give new self-service customers instant access to Salesforce Community Cloud. Which two requirements should the Salesforce Community Cloud support for self-registration and SSO?",
//         "answers": {
//             "a": "SAML SSO and Registration Handler",
//             "b": "OpenId Connect Authentication Provider and JIT provisioning",
//             "c": "OpenId Connect Authentication Provider and Registration Handler",
//             "d": "SAML SSO and Just-in-Time (JIT) provisioning"
//         },
//         "correctAnswer": [
//             "c",
//             "d"
//         ],
//         "explanation": "Salesforce can act as a service provider for SSO using both **SAML** and **OpenID Connect**. For self-registration, when a new user logs in for the first time via SSO, Salesforce can automatically create a user record for them. This can be done via **Just-in-Time (JIT) provisioning**, which handles basic user creation based on attributes in the SSO assertion. For more complex logic during user creation (like linking to a contact or setting specific permissions), a custom Apex **Registration Handler** can be used. Both JIT and Registration Handlers can be used with both protocols, making C and D valid implementation patterns.",
//         "multiSelect": true
//     },
//     {
//         "comment": "// Question 49",
//         "question": "An integration architect has built a solution using REST API, updating Account, Contact, and other related information. The data volumes have increased, resulting in higher API calls consumed, and some days the limits are exceeded. A decision was made to decrease the number of API calls using bulk updates. The customer prefers to continue using REST API to avoid architecture changes. Which REST API composite resources should the integration architect use to allow up to 200 records in one API call?",
//         "answers": {
//             "a": "SObject Collections",
//             "b": "SObject Tree",
//             "c": "Composite",
//             "d": "Batch"
//         },
//         "correctAnswer": "a",
//         "explanation": "The **SObject Collections** resource of the REST API is specifically designed to create, update, or delete multiple records of the same object type in a single API call. It can process a collection of up to 200 records, making it the ideal solution for reducing API call consumption when performing bulk operations on a single object without changing from the REST API.",
//         "multiSelect": false
//     },
//     {
//         "comment": "// Question 50",
//         "question": "Universal Containers (UC) is a global financial company. UC support agents would like to open bank accounts on the spot for customers who inquire about UC products. During the bank account opening process, the agents execute credit checks for the customers through external agencies. At any given time, up to 30 concurrent reps will be using the service to perform credit checks for customers. What error handling mechanisms should be built to display an error to the agent when the credit verification process failed?",
//         "answers": {
//             "a": "Handle verification process error in the Verification Webservice API in case there is a connection issue to the Webservice if it responds with an error.",
//             "b": "In case the verification process is down, use fire and forget mechanism instead of Request and Reply to allow the agent to get the response back when the service is back online.",
//             "c": "Handle integration errors in the middleware in case the verification process is down, then the middleware should retry processing the request multiple times.",
//             "d": "In case the verification process is down, use mock service to send the response to the agent."
//         },
//         "correctAnswer": "a",
//         "explanation": "The user (the agent) needs immediate feedback. The integration should use a Request and Reply pattern. The calling code within Salesforce is responsible for handling potential errors from that synchronous call. This involves using try-catch blocks to gracefully handle connection issues (e.g., timeouts) and to inspect the HTTP response to see if the external web service returned an error status code or message, which can then be displayed to the agent.",
//         "multiSelect": false
//     },
//     {
//         "comment": "// Question 51",
//         "question": "An integration architect has been tasked with integrating Salesforce with an on-premise system. Due to some established policies, this system must remain on-premise. What should the architect use to build a solution for this requirement?",
//         "answers": {
//             "a": "Use Heroku Connect if the data is hosted in Heroku.",
//             "b": "Use Salesforce Connect if the database supports Open Database Connectivity (ODBC).",
//             "c": "Use Salesforce Connect if the data is hosted in Salesforce.",
//             "d": "Use Salesforce Connect if the database supports Open Data Protocol (OData)."
//         },
//         "correctAnswer": "d",
//         "explanation": "**Salesforce Connect** is the primary tool for data virtualization, allowing Salesforce to access and display data from external systems in real-time without storing it. To connect to an on-premise system, that system must expose its data via a web service. Salesforce Connect requires this web service to follow the **OData (Open Data Protocol)** standard. The on-premise system would need an OData producer or wrapper to make its data available to Salesforce Connect.",
//         "multiSelect": false
//     },
//     {
//         "comment": "// Question 52",
//         "question": "An enterprise architect has requested the Salesforce integration architect to review the following (see diagram and description) and provide recommendations after carefully considering all constraints of the enterprise systems and Salesforce platform limits. About 3,000 phone sales agents use a Salesforce Lightning UI concurrently to check eligibility of a customer for a qualifying offer. There are multiple eligibility systems that provide this service and are hosted externally. However, their current response times could take up to 90 seconds to process and return... All requests from Salesforce will have to traverse through the customer's API Gateway layer and the API Gateway imposes a constraint of timing out requests after 9 seconds. Which three recommendations should be made?",
//         "answers": {
//             "a": "Use Continuation callouts to make the eligibility check request from Salesforce Lightning UI at page load.",
//             "b": "Create a platform event in Salesforce via Remote Call-In and use the empApi in the Lightning UI to serve 3,000 concurrent users when responses are received by Mule.",
//             "c": "Recommend synchronous Apex callouts from Lightning UI to External Systems via Mule and implement polling on an API Gateway timeout.",
//             "d": "ESB (Mule) with cache/state management to return a requestID (or) response if available from an external system.",
//             "e": "Implement a \"Check Update\" button that passes a requestID received from ESB (user action needed)."
//         },
//         "correctAnswer": [
//             "a",
//             "d",
//             "e"
//         ],
//         "explanation": "This is a classic asynchronous integration pattern. The 90-second response time is too long for a synchronous call, and the 9-second gateway timeout makes it impossible. **(A)** The initial call from the Lightning UI should be made using the **Continuation framework** to handle the long-running request without freezing the UI. **(D)** Salesforce sends the request to the ESB (MuleSoft), which immediately returns a **request ID** and processes the long-running call in the background. **(E)** The Lightning UI then needs a mechanism, like a **\"Check Update\" button**, that allows the user to poll the ESB using the request ID to see if the response is ready.",
//         "multiSelect": true
//     },
//     {
//         "comment": "// Question 53",
//         "question": "What should an architect recommend to ensure all integrations to the Northern Trail Outfitters company portal use SSL mutual authentication?",
//         "answers": {
//             "a": "Generate a self-signed certificate.",
//             "b": "Enforce SSL/TLS Mutual Authentication.",
//             "c": "Enable My Domain and SSL/TLS.",
//             "d": "Generate a certification authority (CA) signed certificate."
//         },
//         "correctAnswer": "b",
//         "explanation": "Mutual authentication (mTLS) is a security process where both the client and the server validate each other's certificates. To ensure all integrations use this, Salesforce provides a specific setting. Under Certificate and Key Management, you can **'Enforce SSL/TLS Mutual Authentication'** for API requests and call-ins. This requires any client calling Salesforce APIs to present a valid certificate that Salesforce trusts.",
//         "multiSelect": false
//     },
//     {
//         "comment": "// Question 54",
//         "question": "Northern Trail Outfitters (NTO) is looking to integrate three external systems that run nightly data enrichment processes in Salesforce. NTO has both of the following security and strict auditing requirements: 1. The external systems must follow the principle of least privilege. 2. The activities of the external systems must be available for audit. What should an integration architect recommend as a solution for these integrations?",
//         "answers": {
//             "a": "A shared integration user for the three external system integrations.",
//             "b": "A Connected App for each external system integration.",
//             "c": "A unique integration user for each external system integration.",
//             "d": "A shared Connected App for the three external system integrations."
//         },
//         "correctAnswer": "c",
//         "explanation": "To enforce the **principle of least privilege**, each integration should only have the exact permissions it needs. A shared user would have the combined permissions of all three systems, violating this principle. To meet the **auditing requirement**, you need to be able to distinguish the actions of one system from another. A shared user makes this impossible. Therefore, the best practice is to create a **unique integration user for each external system**. This allows you to assign a specific, minimal-permission profile to each user and easily track their individual activities in the setup audit trail and debug logs.",
//         "multiSelect": false
//     },
//     {
//         "comment": "// Question 55",
//         "question": "A customer's enterprise architect has identified requirements around caching, queuing, error handling, alerts, retries, event handling, etc. The company has asked the Salesforce Integration Architect to help fulfill such aspects with their Salesforce program. Which three recommendations should the Salesforce integration architect make?",
//         "answers": {
//             "a": "Provide true message queuing for integration scenarios (including orchestration, process choreography, quality of service, etc.) given that a middleware solution is required.",
//             "b": "Event handling processes such as writing to a log, sending an error of recovery process, or sending an extra message can be assumed to be handled by middleware.",
//             "c": "Transform a Fire and Forget mechanism to Request and Reply, which should be handled by middleware tools (like ETL/ESB) to improve performance.",
//             "d": "Message transformation and protocol translation should be done within Salesforce.",
//             "e": "Event handling in a publish/subscribe scenario, the middleware can be used to route requests or messages to active data event subscribers from active data-event publishers."
//         },
//         "correctAnswer": [
//             "a",
//             "b",
//             "e"
//         ],
//         "explanation": "Salesforce is not designed to be a middleware platform. For complex integration requirements like true message queuing, robust error handling with retries, and complex event routing, the architect should recommend leveraging a dedicated middleware solution (like an ESB or iPaaS). Middleware is purpose-built to **provide message queuing** (A), **handle complex event processing and error recovery** (B), and manage **publish/subscribe routing** (E). Trying to build these capabilities natively in Salesforce is inefficient and brittle.",
//         "multiSelect": true
//     },
//     {
//         "comment": "// Question 56",
//         "question": "A call center manager uses a custom dashboard to track case-related metrics. The manager wants a component to display the number of closed cases in real time. What type of event should be used to meet this requirement?",
//         "answers": {
//             "a": "Change Data Capture Event",
//             "b": "Platform Event",
//             "c": "PushTopic Event",
//             "d": "Generic Event"
//         },
//         "correctAnswer": "c",
//         "explanation": "The requirement is to be notified in real-time when a Case record is updated to meet a specific criteria (Status = 'Closed'). A **PushTopic Event** is ideal for this. You can define a PushTopic with a SOQL query like `SELECT Id FROM Case WHERE Status = 'Closed'`. Whenever a Case record is created or updated to match this query, a notification is sent to the event bus, which a Lightning component can subscribe to and update the UI in real-time.",
//         "multiSelect": false
//     },
//     {
//         "comment": "// Question 57",
//         "question": "Northern Trail Outfitters needs to use Shield Platform Encryption to encrypt social security numbers in order to meet a business requirement. Which two actions should an integration architect take prior to the implementation of Shield Platform Encryption?",
//         "answers": {
//             "a": "Encrypt the data using the most current key.",
//             "b": "Use Shield Platform Encryption as a user authentication or authorization tool.",
//             "c": "Encrypt all the data so that it is secure.",
//             "d": "Review Shield Platform Encryption configurations."
//         },
//         "correctAnswer": [
//             "a",
//             "d"
//         ],
//         "explanation": "Before implementing Shield, it's crucial to plan carefully. This involves **reviewing the configurations** (D) to understand which fields will be encrypted and the type of encryption (deterministic vs. probabilistic), as this has significant impacts on SOQL queries, reporting, and other platform functionality. It's also part of the plan to ensure that when the encryption process runs, you will **use the most current, active tenant secret** (A) to ensure the data is secured with the latest key material.",
//         "multiSelect": true
//     },
//     {
//         "comment": "// Question 58",
//         "question": "The director of customer service at Northern Trail Outfitters (NTO) wants to capture and trend specific business events that occur in Salesforce in real time. The metrics will be accessed in an ad-hoc manner using an external analytics system. The events are as follows: 1. A customer initiates a product exchange via a Case. 2. A customer service rep clicks on the \"Authorize Exchange Product\" menu item in the Case. 3. A customer initiates a subscription cancellation via a Case. 4. A customer service rep clicks on the \"Initiate Refund\" menu item in the Case. Which two solutions will meet these business requirements?",
//         "answers": {
//             "a": "Custom Apex controller that publishes a platform event.",
//             "b": "Case after insert Trigger that publishes a platform event.",
//             "c": "Case after insert Trigger that executes a callout.",
//             "d": "Case Workflow Rule that sends an Outbound Message."
//         },
//         "correctAnswer": [
//             "a",
//             "b"
//         ],
//         "explanation": "The requirement is to capture specific business events (some initiated by data changes, some by UI clicks) and send them to an external system in real-time. **Platform Events** are the ideal mechanism for this fire-and-forget notification pattern. For events triggered by record creation/update (like initiating an exchange), a **Case trigger that publishes a platform event** is appropriate (B). For events triggered by a user clicking a custom button or menu item in the UI, the action would call a **custom Apex controller, which would then publish the platform event** (A).",
//         "multiSelect": true
//     },
//     {
//         "comment": "// Question 59",
//         "question": "The Sales Operations team at Northern Trail Outfitters imports new leads each day. An integrated legacy territory management system assigns territories to leads before Sales team members can work on them. The current integration often experiences latency issues. Which two recommendations should an architect make to improve the integration performance?",
//         "answers": {
//             "a": "Reduce batch size of asynchronous Bulk API.",
//             "b": "Reduce batch size of synchronous Bulk API.",
//             "c": "Legacy system should submit in parallel mode.",
//             "d": "Legacy system should submit in serial mode."
//         },
//         "correctAnswer": [
//             "a",
//             "c"
//         ],
//         "explanation": "To improve Bulk API performance for large data loads, you can enable **parallel mode** (C). This allows Salesforce to process multiple batches concurrently instead of one by one, significantly increasing throughput, provided there are no lock contentions between batches. If latency issues or timeouts are occurring due to complex triggers or automation on the lead object, **reducing the batch size** (A) can help. Smaller batches require less processing time per batch and are less likely to hit governor limits, even though it might result in more total batches being submitted.",
//         "multiSelect": true
//     },
//     {
//         "question": "Service Agents at Northern Trail Outfitters use Salesforce to manage cases and B2C Commerce for ordering. Which integration solution should an architect recommend in order for the service agents to see order history from a B2C Commerce system? ",
//         "answers": {
//             "a": "Salesforce B2C Commerce to Service Cloud Connector ",
//             "b": "A REST API offered by Commerce Platform ",
//             "c": "Mulesoft Anypoint Platform ",
//             "d": "REST API offered by Salesforce Platform "
//         },
//         "correctAnswer": "a",
//         "explanation": "The Salesforce B2C Commerce to Service Cloud Connector is a pre-built, managed solution designed specifically for this use case. It provides the quickest and most reliable way for service agents to view B2C Commerce order history directly within the Service Cloud console without requiring complex custom development.",
//         "multiSelect": false
//     },
//     {
//         "question": "Northern Trail Outfitters needs to use Shield Platform Encryption to encrypt social security numbers in order to meet a business requirement. Which two considerations should an Integration Architect do prior to the implementation of Shield Platform Encryption? ",
//         "answers": {
//             "a": "Review shield platform encryption configurations. ",
//             "b": "Use Shield Platform Encryption as a user authentication or authorization tool. ",
//             "c": "Encrypt the data using the most current key. ",
//             "d": "Encrypt all the data so that it is secure. "
//         },
//         "correctAnswer": ["a", "c"],
//         "explanation": "Before implementing Shield, it's crucial to review its configurations (A) to understand the impact on features like SOQL filtering, reporting, and search. Additionally, establishing a robust key management strategy, which includes using the most current key for encryption and planning for key rotation (C), is a fundamental prerequisite for a secure implementation.",
//         "multiSelect": true
//     },
//     {
//         "question": "Universal Containers (UC) is a global financial company where support agents need to execute credit checks for customers through external agencies during an account opening process. Up to 30 concurrent agents will be using the service. What error handling mechanism should be built to display an error to the agent when the credit verification process fails? ",
//         "answers": {
//             "a": "In case the verification process is down, Use mock service to send the response to the agent. ",
//             "b": "Handle integration errors in the middleware; in case the verification process is down, then the middleware should retry processing the request multiple times. ",
//             "c": "Handle verification process error in the Verification Webservice API in case there is a connection issue to the Webservice if it responds with an error. ",
//             "d": "In case the verification process is down, use fire and forget mechanism instead of request and reply to allow the agent to get the response back when the service is back online. "
//         },
//         "correctAnswer": "c",
//         "explanation": "This is a synchronous, user-facing process where the agent needs immediate feedback. The correct approach is for the calling system to handle errors directly. If the external webservice is unavailable or returns an error, the API call handler should catch that exception or error response and immediately display a clear message to the agent in the UI.",
//         "multiSelect": false
//     },
//     {
//         "question": "A business needs to automate checking the phone number type (mobile vs. landline) for up to 100,000 incoming calls per day using an external API. The updates can happen in batches overnight. A Remote-Call-In pattern with a middleware is the chosen architecture. Which component should an architect recommend to implement this? ",
//         "answers": {
//             "a": "Configure Remote Site Settings in Salesforce to authenticate the middleware. ",
//             "b": "Firewall and reverse proxy are required to protect internal APIs and resource being exposed. ",
//             "c": "Connected App configured in Salesforce to authenticate the middleware. ",
//             "d": "An API Gateway that authenticates requests from Salesforce into the Middleware (ETL/ESB). "
//         },
//         "correctAnswer": "c",
//         "explanation": "The 'Remote Call-In' pattern means the external middleware system is calling *into* Salesforce to update records. The standard and most secure method to authenticate an external application for Salesforce API access is to create a Connected App. The middleware can then use an OAuth 2.0 flow to obtain an access token and securely make its API calls.",
//         "multiSelect": false
//     },
//     {
//         "question": "A large B2C customer is implementing Salesforce with the goals of achieving a 360-degree customer view and leveraging Salesforce for Marketing, Sales, and Service processes. They intend to reuse their existing Quoting and Order Management systems. Based on the provided system landscape, which three systems can be retired? ",
//         "answers": {
//             "a": "Sales Activity System ",
//             "b": "Order Management System ",
//             "c": "Quoting System ",
//             "d": "Case Management System ",
//             "e": "Email Marketing System "
//         },
//         "correctAnswer": ["a", "d", "e"],
//         "explanation": "The goals explicitly state an intent to use Salesforce for Sales, Service, and Marketing. Therefore, Salesforce Sales Cloud can replace the 'Sales Activity System', Service Cloud can replace the 'Case Management System', and Marketing Cloud can replace the 'Email Marketing System'. The goals also explicitly state that the Quoting and Order Management systems will be reused.",
//         "multiSelect": true
//     },
//     {
//         "question": "Northern Trail Outfitters needs to make synchronous callouts to an 'available to promise' service to query product availability during customer checkout. Which two considerations are most important for building a scalable integration solution? ",
//         "answers": {
//             "a": "How many concurrent service calls are being placed. ",
//             "b": "The typical and worst-case historical response times. ",
//             "c": "The number of batch jobs that can run concurrently. ",
//             "d": "The maximum query cursors open per user on the service. "
//         },
//         "correctAnswer": ["a", "b"],
//         "explanation": "For a synchronous callout in a user-facing process, performance and reliability are key. An architect must understand the number of concurrent calls (A) to ensure the system can handle peak load, and the response time (B) to prevent hitting Salesforce governor limits and ensure a good user experience.",
//         "multiSelect": true
//     },
//     {
//         "question": "Which three considerations should an Integration Architect consider when recommending Platform Events as an integration solution? ",
//         "answers": {
//             "a": "When you delete an event definition, it's permanently removed and can't be restored. ",
//             "b": "Inability to query event messages using SOQL. ",
//             "c": "Inability to create a Lightning record page for platform events. ",
//             "d": "You can use Event Monitoring to track user activity, such as logins and running reports. ",
//             "e": "Subscribe to an AssetToken Event stream to monitor OAuth 2.0 authentication activity. "
//         },
//         "correctAnswer": ["a", "b", "c"],
//         "explanation": "When working with Platform Events, it is crucial to know their specific characteristics. Deleting an event definition is a permanent action (A). Unlike sObjects, past event messages cannot be queried with SOQL (B). Also, since they are not records in the traditional sense, they do not have layouts or Lightning record pages (C).",
//         "multiSelect": true
//     },
//     {
//         "question": "Northern Trail Outfitters uses a custom Java application to display code coverage and test results for all of its enterprise applications and wants to include Salesforce data. Which Salesforce API should an Integration Architect use to meet this requirement? ",
//         "answers": {
//             "a": "SOAP API",
//             "b": "Analytics REST API ",
//             "c": "Metadata API ",
//             "d": "Tooling API "
//         },
//         "correctAnswer": "d",
//         "explanation": "The Tooling API is specifically designed for building development and deployment tools. It provides access to development-related metadata and information, including objects like `ApexCodeCoverage` and `ApexTestResult`, which are required to get code coverage and test result data.",
//         "multiSelect": false
//     },
//     {
//         "question": "Universal Containers needs to send a meeting invite from their marketing automation system to contacts of accounts that do not qualify for a business extension. This process will affect approximately 1 million contacts per month. What is the recommended solution? ",
//         "answers": {
//             "a": "Use Trigger. ",
//             "b": "Use Batch Apex. ",
//             "c": "Use Time-based workflow rule. ",
//             "d": "Use Process builder. "
//         },
//         "correctAnswer": "b",
//         "explanation": "Processing 1 million records and making external callouts requires a solution that can handle large data volumes without hitting governor limits. Batch Apex is the ideal Salesforce feature for this, as it processes records in manageable chunks, allowing for stateful operations and callouts within each chunk.",
//         "multiSelect": false
//     },
//     {
//         "question": "Universal Containers uses a three-tier API-led architecture. There is a business requirement to return data to different systems of engagement (e.g., web, mobile) in different formats and with different security protocols. What should an architect recommend? ",
//         "answers": {
//             "a": "Leverage an Identity Provider solution that communicates with the API tiers via SAML. ",
//             "b": "Enforce separate security protocols and return formats at the first tier of the API-led architecture. ",
//             "c": "Implement an API gateway that all systems of engagement must interface with first. ",
//             "d": "Enforce separate security protocols and return formats at the second tier of the API-led architecture. "
//         },
//         "correctAnswer": "b",
//         "explanation": "In an API-led architecture, the first tier is the 'Experience Layer'. Its purpose is to cater specifically to the needs of different front-end applications (systems of engagement). This layer is responsible for tasks like transforming data formats, orchestrating calls to process APIs, and applying channel-specific security policies.",
//         "multiSelect": false
//     },
//     {
//         "question": "An integration architect needs a Streaming API solution that minimizes data loss, even if the client reconnects after being offline for a couple of days. Which two types of Streaming API events should be considered? ",
//         "answers": {
//             "a": "Push Topic Events ",
//             "b": "High Volume Platform Events ",
//             "c": "Generic Events ",
//             "d": "Change Data Capture Events "
//         },
//         "correctAnswer": ["b", "d"],
//         "explanation": "Both High-Volume Platform Events and Change Data Capture Events support message retention for up to 72 hours (3 days). This allows a disconnected client to 'replay' the event stream from the last known replay ID, ensuring that any messages published during the downtime can be retrieved. PushTopic events only offer a 24-hour retention window.",
//         "multiSelect": true
//     },
//     {
//         "question": "Northern Trail Outfitters needs a low-code solution to send a near real-time notification to a middleware's REST endpoint when an Order record is created in Salesforce. Which two options will fulfill the requirements? ",
//         "answers": {
//             "a": "Use Remote Process Invocation fire and forget pattern on insert on the order object using Flow Builder. ",
//             "b": "Use a process builder to create a Platform Event, selecting the record type as the Platform Event Name on insert of record. ",
//             "c": "Implement a Workflow Rule with Outbound Messaging to send SOAP messages to the designated endpoint. ",
//             "d": "Implement Change Data Capture on the order object and leverage the replay Id in the middleware solution. "
//         },
//         "correctAnswer": ["b", "d"],
//         "explanation": "Both Platform Events and Change Data Capture provide modern, event-driven, near real-time integration patterns that are highly scalable and require low-to-no code. A Platform Event can be published from a Flow when an order is created (B). Alternatively, simply enabling Change Data Capture on the Order object (D) will automatically publish events for any record change. The middleware can then subscribe to either of these event streams.",
//         "multiSelect": true
//     },
//     {
//         "question": "Developers at Northern Trail Outfitters are creating numerous point-to-point integrations using asynchronous @future callouts. The CIO is concerned about the scalability of this approach. What should be recommended to mitigate these concerns? ",
//         "answers": {
//             "a": "Refactor the existing future methods to use Enhanced External Services, import Open API 2.0 schemas and update flows to use services instead of Apex. ",
//             "b": "Implement an Enterprise Service Bus for service orchestration, mediation, routing and to decouple dependencies across systems. ",
//             "c": "Implement an ETL tool and perform nightly batch data loads to reduce network traffic using last modified dates on the opportunity object to extract the right records. ",
//             "d": "Develop a comprehensive catalog of Apex classes to eliminate the need for redundant code and use custom metadata to hold the endpoint information for each integration. "
//         },
//         "correctAnswer": "b",
//         "explanation": "The current approach of direct, point-to-point integrations creates a brittle 'spaghetti architecture' that is difficult to manage and scale. The standard architectural solution is to introduce a middleware layer like an Enterprise Service Bus (ESB) or an integration platform. This creates a hub-and-spoke model, which decouples the systems and provides a central point for routing, transformation, and monitoring, making the entire landscape more scalable and maintainable.",
//         "multiSelect": false
//     },
//     {
//         "question": "While merging two Salesforce orgs, Northern Trail Outfitters needs to keep the old org active for a short time to capture leads from web forms. New leads must appear in the new org within 30 minutes. Which two approaches require the least development effort for this org-to-org integration? ",
//         "answers": {
//             "a": "Call the Salesforce REST API to insert the lead into the target system. ",
//             "b": "Configure named credentials in the source org. ",
//             "c": "Use the tooling API with Process Builder to insert leads in real time. ",
//             "d": "Use the Composite REST API to aggregate multiple leads in a single call. "
//         },
//         "correctAnswer": ["a", "b"],
//         "explanation": "This requires an outbound callout from the source org to the target org. The best practice is to configure a Named Credential (B) in the source org to securely handle the authentication and endpoint URL for the target org. The Apex code in the source org would then make a callout to the standard Salesforce REST API (A) on the target org to create the new Lead record. These two components form the core of a standard, low-effort org-to-org integration.",
//         "multiSelect": true
//     },
//     {
//         "question": "Northern Trail Outfitters is planning to create a native employee-facing mobile app that has the look and feel of Salesforce's Lightning Experience and integrates with their Salesforce org. Which Salesforce API should be used? ",
//         "answers": {
//             "a": "REST API ",
//             "b": "Connect REST API ",
//             "c": "Streaming API ",
//             "d": "User Interface API "
//         },
//         "correctAnswer": "d",
//         "explanation": "The User Interface (UI) API is specifically designed for this use case. It provides data and metadata in a single response, structured according to Salesforce layouts and respecting user permissions (field-level security, sharing). This allows a developer to build a custom front-end that mirrors the Lightning Experience without having to re-implement the complex UI metadata logic.",
//         "multiSelect": false
//     },
//     {
//         "question": "Salesforce users need to read data from an external system via an HTTPS request. Which two security methods should an integration architect leverage within Salesforce to secure this outbound integration? ",
//         "answers": {
//             "a": "Named Credentials ",
//             "b": "Authorization Provider ",
//             "c": "Two way SSL ",
//             "d": "Connected App "
//         },
//         "correctAnswer": ["a", "c"],
//         "explanation": "For outbound HTTPS requests (callouts), Named Credentials (A) are the best practice for securely storing the endpoint URL and authentication parameters, abstracting them from code. For a higher level of security, Two-way SSL (also known as mutual authentication) (C) can be implemented. This requires Salesforce to present its unique client certificate to the external system, which can then verify that the request is coming from a trusted source.",
//         "multiSelect": true
//     },
//     {
//         "question": "A global company is implementing Salesforce and has complex authentication requirements for different user types (internal via local AD, customers via Google/native, partners via a central system). Which three areas should the integration architect evaluate when designing the solution? ",
//         "answers": {
//             "a": "Evaluate Salesforce solution for customers and for partners, using third party solution for internal users. ",
//             "b": "Assess security requirements for internal systems and decide Integration methods that support the requirements. ",
//             "c": "Consider Third party Single Sign On solution supporting all user authentication including customer and partner. ",
//             "d": "Evaluate Salesforce native authentication mechanism for all users including customers and partners. ",
//             "e": "Evaluate the build of a custom authentication mechanism for users in each country and support for customers and partners. "
//         },
//         "correctAnswer": ["a", "b", "c"],
//         "explanation": "Given the diverse requirements, the architect must perform a thorough evaluation. This includes assessing a hybrid approach using Salesforce Community identity for externals and a federated SSO solution for internals (A), analyzing the security needs of all integrated systems to choose appropriate patterns (B), and considering a central third-party Identity Provider (like Okta, Azure AD) as a strategic option to manage identity for all user populations (C).",
//         "multiSelect": true
//     },
//     {
//         "question": "Northern Trail Outfitters needs to integrate three external systems for nightly data enrichment. The solution must follow the principle of least privilege and ensure all activities can be audited. What should the architect recommend? ",
//         "answers": {
//             "a": "A shared Connected App for the three external system integrations. ",
//             "b": "A shared integration user for the three external system integrations. ",
//             "c": "A unique integration user for each external system integration. ",
//             "d": "A Connected App for each external system integration. "
//         },
//         "correctAnswer": "c",
//         "explanation": "To meet both least privilege and auditing requirements, each external system needs a distinct identity. The best practice is to create a unique integration user for each system. This allows for assigning a tailored Profile and Permission Set with only the necessary permissions (least privilege). Furthermore, any records created or modified by that system will be stamped with that unique user's ID in fields like `CreatedById`, enabling a clear audit trail.",
//         "multiSelect": false
//     },
//     {
//         "question": "Northern Trail Outfitters wants to automatically post a Chatter item to Twitter whenever the post includes the hashtag #thanksNTO. Which API should be used to interact with the Chatter feeds? ",
//         "answers": {
//             "a": "Streaming API ",
//             "b": "REST API ",
//             "c": "Connect REST API ",
//             "d": "Apex REST "
//         },
//         "correctAnswer": "c",
//         "explanation": "The Connect REST API is specifically designed for building applications that interact with Salesforce's social and collaborative features, including Chatter, files, communities, and recommendations. It provides a rich set of resources for working with feeds, comments, and users, making it the ideal choice for this use case.",
//         "multiSelect": false
//     },
//     {
//         "question": "In the provided sequence diagram, which computation represents the end-to-end response time from the user's perspective, defined as the time from the initial click to the final UI render? ",
//         "answers": {
//             "a": "Sum of A, G, and H",
//             "b": "Sum of A to F ",
//             "c": "Sum of A to H ",
//             "d": "Sum of A and H "
//         },
//         "correctAnswer": "d",
//         "explanation": "The user's perceived response time starts with their action (1: onClick) and ends when the result is displayed (3: render). The duration 'A' represents the time taken for all synchronous processing, including the calls to middleware and backend systems. The process 'G' runs asynchronously and does not block the UI. After the synchronous data is returned at step 2.4, the UI takes duration 'H' to render it. Therefore, the total time the user waits is the sum of the synchronous processing time (A) and the rendering time (H).",
//         "multiSelect": false
//     },
//     {
//         "question": "Universal Containers needs to allow third-party agencies to view 2.5 GB design files, currently stored on-premise, within a Salesforce community. Which solution should an integration architect recommend? ",
//         "answers": {
//             "a": "Create a lightning component with a Request and Reply integration pattern to allow the community users to download the design files. ",
//             "b": "Define an External Data Source and use Salesforce Connect to upload the files to an external object. Link the external object using Indirect lookup. ",
//             "c": "Create a custom object to store the file location URL, when community user clicks on the file URL, redirect the user to the on-prem system file location. ",
//             "d": "Use Salesforce Files to link the files to Salesforce records and display the record and the files in the community. "
//         },
//         "correctAnswer": "c",
//         "explanation": "The 2.5 GB file size exceeds the 2 GB limit for Salesforce Files, so the file cannot be stored directly in Salesforce. The most practical solution is to leave the large file in its on-premise location. By creating a Salesforce record that stores the URL to the file, community users can simply click a link that redirects them to the on-premise system to view or download it. This approach, known as 'data virtualization' for files, avoids data duplication and respects platform limits.",
//         "multiSelect": false
//     },
//     {
//         "question": "What should an Architect recommend to ensure all integrations to the Northern Trail Outfitters company portal use SSL mutual authentication? ",
//         "answers": {
//             "a": "Enable My Domain and SSL/TLS. ",
//             "b": "Enforce SSL/TLS Mutual Authentication. ",
//             "c": "Generate a Self-signed Certificate. ",
//             "d": "Generate a CA-signed Certificate. "
//         },
//         "correctAnswer": "b",
//         "explanation": "While generating and uploading a certificate is part of the process, the specific setting that enforces the requirement is the 'Enforce SSL/TLS Mutual Authentication' user permission. When this permission is assigned to an API integration user, Salesforce will reject any login attempt from that user that does not present the required client certificate, thus enforcing mutual authentication.",
//         "multiSelect": false
//     },
//     {
//         "question": "A company needs to push 2 million records daily from Salesforce to a system behind a corporate firewall. The integration does not need to be real-time. What is a key consideration for the integration architect? ",
//         "answers": {
//             "a": "Due to high volume of records, a third party integration tool is required to stage records off platform. ",
//             "b": "Due to high volume of records, number of concurrent requests can hit the limit for the REST API call to external system. ",
//             "c": "Due to high volume of records, salesforce will need to make a REST API call to external system. ",
//             "d": "Due to high volume of records, the external system will need to use a BULK API Rest endpoint to connect to salesforce. "
//         },
//         "correctAnswer": "b",
//         "explanation": "A daily push of 2 million records from Salesforce will likely be implemented using multiple Batch Apex jobs that make callouts. A critical Salesforce governor limit is the number of concurrent long-running Apex requests (which includes callouts). The architect must design the solution to manage and throttle the number of concurrent batches to avoid exceeding this limit, which would cause jobs to fail.",
//         "multiSelect": false
//     },
//     {
//         "question": "A healthcare company's policy states that identifiable patient prescription data must only exist in their secure external database. This data is exposed via RESTful services. Which two capabilities are required for their Salesforce Community Cloud portal (for viewing data) and Einstein Analytics (for analyzing de-identified data)? ",
//         "answers": {
//             "a": "Encryption in transit and at rest ",
//             "b": "Bulk load for Einstein Analytics ",
//             "c": "Identity token data storage ",
//             "d": "Callouts to RESTful services "
//         },
//         "correctAnswer": ["b", "d"],
//         "explanation": "Since identifiable data cannot be stored in Salesforce, the Community portal must make real-time callouts to the external RESTful services (D) to fetch and display the data on-demand (data virtualization). For Einstein Analytics, which uses de-identified data, the most efficient way to load this large, transformed dataset would be via a bulk load mechanism (B).",
//         "multiSelect": false
//     },
//     {
//         "question": "Universal Containers needs a near real-time feed of student registrations from Salesforce to an external learning system. The architect recommends using a Salesforce event. Which API should the external system use to subscribe to these events? ",
//         "answers": {
//             "a": "Tooling API ",
//             "b": "SOAP API ",
//             "c": "Streaming API ",
//             "d": "REST API "
//         },
//         "correctAnswer": "c",
//         "explanation": "The Streaming API is the Salesforce API that allows external clients to subscribe to event streams from the platform. The external learning system would use the Streaming API to maintain a connection to a specific event channel (for Platform Events, Change Data Capture, etc.) and receive notifications in near real-time as they are published by Salesforce.",
//         "multiSelect": false
//     },
//     {
//         "question": "A security assessment found secrets (passwords, tokens) stored in plain text for callouts from Salesforce. Which two persistence mechanisms should be used to protect these secrets from exposure? ",
//         "answers": {
//             "a": "Encrypted Custom Fields ",
//             "b": "Named Credentials ",
//             "c": "Protected Custom Metadata Types ",
//             "d": "Protected Custom Settings "
//         },
//         "correctAnswer": ["b", "c"],
//         "explanation": "Named Credentials (B) are the best practice for securely storing callout endpoints and authentication details, as they abstract the secrets from code and are encrypted at rest. For other secrets used within Apex that are not part of a direct callout (e.g., an API key for signing a request), Protected Custom Metadata Types (C) provide a secure storage mechanism, especially within managed packages, as they are not visible to subscribers.",
//         "multiSelect": true
//     },
//     {
//         "question": "A daily lead import is followed by a territory assignment process run by a legacy system. This integration has latency issues. Which two recommendations should an Architect make to improve the integration performance when using the Bulk API? ",
//         "answers": {
//             "a": "Reduce batch size of asynchronous BULK API. ",
//             "b": "Legacy system should submit in parallel mode. ",
//             "c": "Legacy system should submit in serial mode. ",
//             "d": "Reduce batch size of synchronous BULK API. "
//         },
//         "correctAnswer": ["a", "b"],
//         "explanation": "To maximize throughput with the Bulk API, the external system should submit its data batches in parallel mode (B), which allows Salesforce to process multiple batches concurrently. While it may seem counterintuitive, sometimes very large batches can cause database lock contention; reducing the batch size (A) can lead to faster processing for each individual batch, and when combined with parallel mode, can result in a higher overall throughput.",
//         "multiSelect": true
//     },
//     {
//         "question": "An application uses Platform Events to synchronize multiple systems. If events are currently only being published from an Apex transaction, what can be said about the timing of the publication? ",
//         "answers": {
//             "a": "The platform events are published immediately before the Apex transaction completes. ",
//             "b": "The platform events are published after the Apex transaction completes. ",
//             "c": "The platform events has a trigger in Apex. ",
//             "d": "The platform events are being published from Apex. "
//         },
//         "correctAnswer": "b",
//         "explanation": "Platform Event publication is tied to the success of the Apex transaction. When `EventBus.publish()` is called, the event is queued but not sent immediately. The platform only sends the event to the event bus *after* the entire transaction has successfully completed and been committed to the database. If the transaction rolls back, the event is never published.",
//         "multiSelect": false
//     },
//     {
//         "question": "A global financial company with a core banking system that processes 10M transactions per day wants to allow customers to view their financial transactions in a community portal. What solution should be recommended? ",
//         "answers": {
//             "a": "Use Salesforce External Service to display financial transactions in a community lightning page. ",
//             "b": "Use Salesforce Connect to display the financial transactions as an external object. ",
//             "c": "Use Iframe to display core banking financial transactions data in the customer community. ",
//             "d": "Use Salesforce Connect to display the financial transactions as an external object. "
//         },
//         "correctAnswer": "b",
//         "explanation": "This is a classic use case for Salesforce Connect. The volume of data is too high to replicate into Salesforce. Salesforce Connect allows you to define an External Object that provides a live, real-time connection to the data in the external system. Community users can view, search, and interact with the external object records as if they were native Salesforce data, but without storing the data in Salesforce.",
//         "multiSelect": false
//     },
//     {
//         "question": "Universal Containers is implementing Salesforce as their CRM, replacing separate systems for leads, contacts (in Outlook), and activities, while integrating with an existing ERP. What is the most important initial step for an Integration Consultant? ",
//         "answers": {
//             "a": "Explore Out of box Salesforce connectors for integration with ERP, Marketing and Microsoft Outlook systems. ",
//             "b": "Propose a middleware system that can support interface between systems with Salesforce. ",
//             "c": "Plan for migration of customer and sales data across systems on a regular basis to keep them in sync. ",
//             "d": "Evaluate current and future data and system usage and then identify potential integration requirements to Salesforce. "
//         },
//         "correctAnswer": "d",
//         "explanation": "Before proposing any specific technology or solution (like connectors or middleware), the foundational first step is a thorough discovery and analysis. The consultant must evaluate the existing systems, data flows, business processes, and future-state goals to properly identify and document the detailed integration requirements. This analysis forms the basis for all subsequent architectural and design decisions.",
//         "multiSelect": false
//     },
//     {
//         "question": "An Architect must integrate with an External Data Source via a Named Credential and an Apex callout due to technical constraints. How is authentication achieved? ",
//         "answers": {
//             "a": "Handle authentication with login flows. ",
//             "b": "Handle authentication in the code. ",
//             "c": "Connect via Salesforce Connect. ",
//             "d": "Connect via Communities. "
//         },
//         "correctAnswer": "b",
//         "explanation": "While a Named Credential typically handles authentication automatically, the phrase 'due to technical constraints' implies a non-standard scenario. For example, the external system might require a custom HMAC signature or a dynamically generated token. In such cases, the developer would use Apex code to construct the necessary authentication headers or parameters before making the callout, even while using the Named Credential to manage the base URL and other secrets.",
//         "multiSelect": false
//     },
//     {
//         "question": "Northern Trail Outfitters needs to perform a one-time load of 90 million records into Salesforce, and then extract 30 million records to an external system. What API strategy should be used to complete this within a day? ",
//         "answers": {
//             "a": "Insert using Bulk API 2.0 and query using REST API. ",
//             "b": "Insert and query using Bulk API 1.0. ",
//             "c": "Insert using Bulk API 1.0 and query using REST API. ",
//             "d": "Insert and query using Bulk API 2.0. "
//         },
//         "correctAnswer": "d",
//         "explanation": "For data volumes of this magnitude, the Bulk API is the only suitable choice for both loading and extracting data. Bulk API 2.0 is the modern, simplified version that automatically handles the creation and management of batches (chunking), making it easier to use than Bulk API 1.0. Using Bulk API 2.0 for both the insert and the query job is the most efficient and scalable approach.",
//         "multiSelect": false
//     },
//     {
//         "question": "A CIO wants recommendations for monitoring nightly Bulk API jobs that are run from a custom Java application. Which two recommendations are most appropriate? ",
//         "answers": {
//             "a": "Use the getBatchInfo method in the Java application to monitor the status of the jobs from the Java application. ",
//             "b": "Write the error response from the Bulk API status to a custom error logging object in Salesforce using an Apex trigger and create reports on the object. ",
//             "c": "Set the Salesforce debug logs level to 'finest' and add the user Id running the job to monitor in the 'Debug Logs' in the setup menu. ",
//             "d": "Visually monitor in the Salesforce UI using the 'Bulk Data Load Jobs' page in the setup menu. "
//         },
//         "correctAnswer": ["a", "d"],
//         "explanation": "A robust monitoring strategy should include both automated and manual methods. The Java application should be built to programmatically poll for the status of the jobs and batches it creates using the appropriate API calls (A), enabling automated logging and alerting. For manual inspection and high-level oversight by administrators, the built-in 'Bulk Data Load Jobs' page in Salesforce Setup provides a simple and effective user interface (D).",
//         "multiSelect": true
//     },

//     {
//         "question": "Northern Trail Outfitters needs to present shipping costs and estimated delivery times to their customers. Shipping services used vary by region, and have similar but distinct service request parameters. Which integration component capability should be used?",
//         "answers": {
//             "a": "Enterprise Service Bus to determine which shipping service to use, and transform requests to the necessary format.",
//             "b": "Outbound Messaging to request costs and delivery times from Shipper delivery services with automated error retry.",
//             "c": "APEX REST Service to implement routing logic to the various shipping service.",
//             "d": "Enterprise Service Bus user interface to collect shipper-specific form data."
//         },
//         "correctAnswer": "a",
//         "explanation": "Using an Enterprise Service Bus (ESB) is the best solution because it can provide routing, transformation, mediation, and orchestration capabilities for integrating different services. An ESB abstracts the complexity of the various shipping services from the main application, simplifying the integration.",
//         "multiSelect": false
//     },
//     {
//         "question": "Northern Trail Outfitters (NTO) uses different shipping services for each of the 34 countries it serves. Services are added and removed frequently to optimize shipping times and costs. Sales Representatives serve all NTO customers globally and need to select between valid service(s) for the customer's country and request shipping estimates from that service. Which two solutions should an architect propose?",
//         "answers": {
//             "a": "Use Platform Events to construct and publish shipper-specific events.",
//             "b": "Invoke middleware service to retrieve valid shipping methods.",
//             "c": "Use middleware to abstract the call to the specific shipping services.",
//             "d": "Store shipping services in a picklist that is dependent on a country picklist."
//         },
//         "correctAnswer": [
//             "b",
//             "c"
//         ],
//         "explanation": "A middleware service can act as a single point of entry to retrieve valid shipping methods for a given country. It can also abstract the complexity of calling the specific shipping services, handling the different request/response formats and hiding the heterogeneity of the underlying systems from Salesforce.",
//         "multiSelect": true
//     },
//     {
//         "question": "An integration architect needs to build a solution that will be using the Streaming API, but the data loss should be minimized, even when the client re-connects every couple of days. Which two types of Streaming API events should be considered?",
//         "answers": {
//             "a": "Generic Events",
//             "b": "Change Data Capture Events",
//             "c": "Push Topic Events",
//             "d": "High Volume Platform Events"
//         },
//         "correctAnswer": [
//             "b",
//             "d"
//         ],
//         "explanation": "Both Change Data Capture (CDC) Events and High Volume Platform Events support reliable event delivery. This means events are stored for up to 72 hours and can be replayed by subscribers using a replay ID if they disconnect, which minimizes data loss.",
//         "multiSelect": true
//     },
//     {
//         "question": "A company needs to integrate a legacy on premise application that can only support SOAP API. After the Integration Architect has evaluated the requirements and volume, they determined that the Fire and Forget integration pattern will be most appropriate for sending data from Salesforce to the external application and getting response back in a strongly typed format. Which integration capabilities should be used to integrate the two systems?",
//         "answers": {
//             "a": "Outbound Message for Salesforce to Legacy System direction and SOAP API using Enterprise WSDL for the communication back from legacy system to salesforce.",
//             "b": "Platform Events for Salesforce to Legacy System direction and SOAP API using Partner WSDL for the communication back from legacy system to salesforce.",
//             "c": "Platform Events for Salesforce to Legacy System direction and SOAP API using Enterprise WSDL for the communication back from legacy system to salesforce.",
//             "d": "Outbound Message for Salesforce to Legacy System direction and SOAP API using Partner WSDL for the communication back from legacy system to salesforce."
//         },
//         "correctAnswer": "a",
//         "explanation": "Outbound Message is a declarative, SOAP-based feature that fits the 'Fire and Forget' pattern for sending data from Salesforce. For the return communication, the Enterprise WSDL should be used because it is strongly typed, meaning it's tied to a specific Salesforce configuration, which matches the requirement for a 'strongly typed format'.",
//         "multiSelect": false
//     },
//     {
//         "question": "A company in a heavily regulated industry requires data in legacy systems to be displayed in Salesforce user interfaces (UIs). They are proficient in their cloud-based ETL (extract, transform, load) tools. They expose APIs built on their on-premise middleware to cloud and on-premise applications. Which two findings about their current state will allow copies of legacy data in Salesforce?",
//         "answers": {
//             "a": "Only on-premise systems are allowed access to legacy systems.",
//             "b": "Cloud-based ETL can access Salesforce and supports queues.",
//             "c": "On-premise middleware provides APIs to legacy systems data.",
//             "d": "Legacy systems can use queues for on-premise integration."
//         },
//         "correctAnswer": [
//             "b",
//             "c"
//         ],
//         "explanation": "The fact that the on-premise middleware provides APIs to the legacy data (C) means the data is accessible. The fact that their cloud-based ETL tool can access Salesforce (B) means they have a mechanism to move that accessible data into Salesforce. These two findings together confirm the feasibility of the project.",
//         "multiSelect": true
//     },
//     {
//         "question": "An architect decided to use Platform Events for integrating Salesforce with an external system for a company. Which three things should an architect consider when proposing this type of integration mechanism?",
//         "answers": {
//             "a": "To subscribe to an event, the integration user in Salesforce needs read access to the event entity.",
//             "b": "Salesforce needs to be able to store information about the external system in order to know which event to send out.",
//             "c": "External system needs to have the same uptime in order to be able to keep up with Salesforce Platform Events.",
//             "d": "To publish an event, the integration user in salesforce needs create permission on the event entity.",
//             "e": "Error handling must be performed by the remote service because the event is effectively handed off to the remote system for further processing."
//         },
//         "correctAnswer": [
//             "a",
//             "d",
//             "e"
//         ],
//         "explanation": "Using Platform Events requires the integration user to have 'Create' permission on the event object to publish events and 'Read' permission to subscribe to them. Because Platform Events follow a 'fire-and-forget' model, Salesforce does not guarantee delivery or acknowledgment; therefore, any error handling must be implemented by the subscribing remote system.",
//         "multiSelect": true
//     },
//     {
//         "question": "A developer has been tasked by the integration architect to build a solution based on the Streaming API. The developer has done some research and has found there are different implementations of the events in Salesforce (Push Topic Events, Change Data Capture, Generic Streaming, Platform Events), but is unsure of to proceed with the implementation. The developer asks the system architect for some guidance. What should the architect consider when making the recommendation?",
//         "answers": {
//             "a": "Push Topic Event can define a custom payload.",
//             "b": "Change Data Capture can be published from Apex.",
//             "c": "Apex triggers can subscribe to Generic Events."
//         },
//         "correctAnswer": "a",
//         "explanation": "One key differentiator is that Push Topic Events allow for a custom payload. They are based on a SOQL query, and you can specify the exact fields to be returned in the event message using the SELECT clause. This allows you to customize the payload according to your integration needs. *Note: The source document provides 'B' as the answer but gives an explanation for 'A'. The explanation for 'A' is correct, while 'B' is incorrect as CDC events are published by the platform, not Apex. This response uses the correct answer based on the explanation.*",
//         "multiSelect": false
//     },
//     {
//         "question": "Universal Containers (UC) currently owns a middleware tool and they have developed an API-led integration architecture with three API tiers. The first-tier interfaces directly with the systems of engagement, the second tier implements business logic and aggregates data, while the third-tier interfaces directly with systems of record. Some of the systems of engagement will be a mobile application, a web application, and Salesforce. UC has a business requirement to return data to the systems of engagement in different formats while also enforcing different security protocols. What should an Integration Architect recommend to meet these requirements?",
//         "answers": {
//             "a": "Enforce separate security protocols and return formats at the first tier of the API-led architecture.",
//             "b": "Implement an API gateway that all systems of engagement must interface with first.",
//             "c": "Enforce separate security protocols and return formats at the second tier of the API-led architecture.",
//             "d": "Leverage an Identity Provider solution that communicates with the API tiers via SAML"
//         },
//         "correctAnswer": "a",
//         "explanation": "The first tier in an API-led architecture is the 'Experience Layer'. Its purpose is to provide a tailored interface for each system of engagement (e.g., mobile app, web app). It is the ideal place to handle transformations for different data formats and enforce security protocols specific to each consuming application.",
//         "multiSelect": false
//     },
//     {
//         "question": "What should an Architect recommend to ensure all integrations to the Northern Trail Outfitters company portal use SSL mutual authentication?",
//         "answers": {
//             "a": "Enable My Domain and SSL/TLS.",
//             "b": "Enforce SSL/TLS Mutual Authentication.",
//             "c": "Generate a Self-signed Certificate.",
//             "d": "Generate a CA-signed Certificate."
//         },
//         "correctAnswer": "b",
//         "explanation": "To ensure all integrations use mutual authentication, the specific user permission 'Enforce SSL/TLS Mutual Authentication' must be assigned to the integration users. This forces the client to present a valid certificate that Salesforce can verify, in addition to the standard server certificate verification.",
//         "multiSelect": false
//     },
//     {
//         "question": "When designing an integration between Salesforce and an order fulfillment system using Outbound Messaging, which two key questions should an integration architect consider?",
//         "answers": {
//             "a": "Can the fulfillment system create new addresses within the Order Create service?",
//             "b": "Can the fulfillment system make a callback into Salesforce?",
//             "c": "Can the fulfillment system implement a contract-first Outbound Messaging interface?",
//             "d": "Is the product catalog data identical at all times in both systems?"
//         },
//         "correctAnswer": [
//             "b",
//             "c"
//         ],
//         "explanation": "For a robust integration, the architect needs to confirm if the fulfillment system can implement a listener based on the WSDL provided by Salesforce (contract-first) (C). Additionally, confirming if the system can make a callback to Salesforce (B) is crucial for updating the order status in Salesforce after the fulfillment system has processed the order.",
//         "multiSelect": true
//     },
//     {
//         "question": "Northern Trail Outfitters has recently experienced intermittent network outages in its call center. When network service resumes, Sales representatives have inadvertently created duplicate orders in the manufacturing system because the order was placed but the return acknowledgement was lost during the outage. Which solution should an architect recommend to avoid duplicate order booking?",
//         "answers": {
//             "a": "Use Outbound Messaging to ensure manufacturing acknowledges receipt of order.",
//             "b": "Use scheduled apex to query manufacturing system for potential duplicate or missing orders.",
//             "c": "Implement idempotent design and have Sales Representatives retry order(s) in question.",
//             "d": "Have scheduled Apex resubmit orders that do not have a successful response."
//         },
//         "correctAnswer": "c",
//         "explanation": "An idempotent design ensures that making the same request multiple times produces the same result as making it once. This is perfect for scenarios with network failures. If an order submission is retried, the manufacturing system would recognize it (e.g., via a unique transaction ID) and not create a duplicate order.",
//         "multiSelect": false
//     },
//     {
//         "question": "A large consumer goods manufacturer operating in multiple countries is planning to implement Salesforce. They have various security requirements for internal users, customers, and partners across different systems. Which three aspects should the integration architect evaluate while designing the integration needs of this project?",
//         "answers": {
//             "a": "Evaluate Salesforce solution for customers and for partners, using third party solution for internal users.",
//             "b": "Assess security requirements for internal systems and decide Integration methods that support the requirements.",
//             "c": "Evaluate the build of a custom authentication mechanism for users in each country and support for customers and partners.",
//             "d": "Consider Third party Single Sign On solution supporting all user authentication including customer and partner.",
//             "e": "Evaluate Salesforce native authentication mechanism for all users including customers and partners."
//         },
//         "correctAnswer": [
//             "b",
//             "c",
//             "e"
//         ],
//         "explanation": "The architect must assess security for integrated internal systems like the ERP (B). Given the diverse requirements (local Active Directory, Google login, etc.), they must evaluate building a custom authentication solution (C) and also consider the capabilities and limitations of Salesforce's native authentication features (E) to find the right mix of solutions.",
//         "multiSelect": true
//     },
//     {
//         "question": "A customer is migrating from an old legacy system to Salesforce. As part of the modernization effort, they would like to integrate all existing systems that currently work with their legacy application with Salesforce. Which three constraints and pain-points should an integration architect consider when choosing the integration pattern/mechanism?",
//         "answers": {
//             "a": "System types - APIs, File systems, Email",
//             "b": "Reporting and usability requirements",
//             "c": "Multi-language and multi-currency requirement",
//             "d": "Error handling mechanisms",
//             "e": "Data Volume and Processing volume"
//         },
//         "correctAnswer": [
//             "a",
//             "d",
//             "e"
//         ],
//         "explanation": "When integrating with multiple existing systems, the architect must consider the types of interfaces available (APIs, files, etc.) (A), the expected data and transaction volumes to ensure scalability (E), and how errors will be handled across these disparate systems to ensure reliability (D).",
//         "multiSelect": true
//     },
//     {
//         "question": "Northern Trail Outfitters is planning to create a native employee facing mobile app with the look and feel of Salesforce's Lighting Experience. The mobile app needs to integrate with their Salesforce org. Which Salesforce API should be used to implement this integration?",
//         "answers": {
//             "a": "Streaming API",
//             "b": "REST API",
//             "c": "Connect REST API",
//             "d": "User Interface API"
//         },
//         "correctAnswer": "d",
//         "explanation": "The User Interface API is specifically designed to build native mobile apps and custom web apps with the Salesforce look and feel. It provides access to metadata, data, and UI components like layouts and actions, handling the rendering logic so the developer doesn't have to.",
//         "multiSelect": false
//     },
//     {
//         "question": "A training company needs to verify trainer credentials from 10 different accreditation agencies before they can provide training. Each agency has its own web service and response times can take days. What is the recommended approach to automate this process?",
//         "answers": {
//             "a": "Use Salesforce external service to make the call out, Salesforce external service should check the verification agencies until the result is verified, then update the trainer status to 'verified'.",
//             "b": "Create a trigger on the trainer record to make a Callout to each verification agencies, write business logic to consolidate the verification then update the trainer status to verified'.",
//             "c": "Make an apex callout using @future annotation to make the call out to all different agencies. The response should update the trainer status to 'verified'.",
//             "d": "Use middleware to handle the call out to the 10 different verification services, the middleware will handle the business logic of consolidating the verification result from the 10 services, then make a call-in to salesforce and update the verification status to 'verified'."
//         },
//         "correctAnswer": "d",
//         "explanation": "This is a complex, long-running process (orchestration) involving multiple external systems. Middleware is the ideal solution as it is designed to handle such complexity. It can manage the asynchronous callouts to all 10 services, consolidate the results over several days, handle errors and retries, and then make a single, clean call back to Salesforce to update the record.",
//         "multiSelect": false
//     },
//     {
//         "question": "A business needs to check and update the phone number type (mobile vs. landline) for up to 100,000 incoming calls per day. The check is done via an external service API. This process can be done in batches overnight. A Remote-Call-In pattern via middleware has been selected. Which component should an integration architect recommend to implement this pattern?",
//         "answers": {
//             "a": "Connected App configured in Salesforce to authenticate the middleware.",
//             "b": "Configure Remote Site Settings in Salesforce to authenticate the middleware.",
//             "c": "An API Gateway that authenticates requests from Salesforce into the Middleware (ETL/ESB).",
//             "d": "Firewall and reverse proxy are required to protect internal APIs and resource being exposed."
//         },
//         "correctAnswer": "a",
//         "explanation": "In a Remote-Call-In pattern, an external system (the middleware) calls into Salesforce. A Connected App is the modern framework for enabling external applications to integrate with Salesforce APIs. It uses standard protocols like OAuth 2.0 to securely authenticate the middleware and authorize its access to Salesforce data.",
//         "multiSelect": false
//     },
//     {
//         "question": "Which WSDL should an architect consider when creating an integration that might be used for more than one Salesforce organization and different metadata?",
//         "answers": {
//             "a": "Corporate WSDL",
//             "b": "Partner WSDL",
//             "c": "SOAP API WSDL",
//             "d": "Enterprise WSDL"
//         },
//         "correctAnswer": "b",
//         "explanation": "The Partner WSDL is loosely typed and static. It is not tied to a specific Salesforce org's configuration. This makes it ideal for building integrations that are intended to work across multiple Salesforce orgs, as it can adapt to different metadata and custom objects at runtime.",
//         "multiSelect": false
//     },
//     {
//         "question": "Universal Containers is planning to implement Salesforce as their CRM, replacing several existing systems for leads, contacts, and activities. Inventory and billing remain in their ERP. The goal is a single view of the customer. What should an Integration Consultant consider first to support the proposed CRM system strategy?",
//         "answers": {
//             "a": "Plan for migration of customer and sales data across systems on a regular basis to keep them in sync.",
//             "b": "Evaluate current and future data and system usage and then identify potential integration requirements to Salesforce.",
//             "c": "Explore Out of box Salesforce connectors for integration with ERP, Marketing and Microsoft Outlook systems.",
//             "d": "Propose a middleware system that can support interface between systems with Salesforce."
//         },
//         "correctAnswer": "b",
//         "explanation": "Before proposing any specific tool or pattern, the first and most critical step is to perform a thorough analysis. The consultant must understand the business needs, data flows, volume, frequency, and security requirements to properly identify and design the necessary integrations.",
//         "multiSelect": false
//     },
//     {
//         "question": "An Architect is required to integrate with an External Data Source via a Named Credential with an Apex callout due to technical constraints. How is authentication achieved?",
//         "answers": {
//             "a": "Handle authentication with login flows.",
//             "b": "Handle authentication in the code.",
//             "c": "Connect via Salesforce Connect.",
//             "d": "Connect via Communities."
//         },
//         "correctAnswer": "b",
//         "explanation": "When using a Named Credential with an Apex callout, the Apex code itself handles the invocation. The Named Credential stores the endpoint URL and authentication parameters, but the HttpRequest class in Apex is used to construct and send the request, effectively handling the authentication process as defined in the Named Credential.",
//         "multiSelect": false
//     },
//     {
//         "question": "What are two key considerations an Integration Architect should make prior to the implementation of Shield Platform Encryption?",
//         "answers": {
//             "a": "Encrypt the data using the most current key.",
//             "b": "Review shield platform encryption configurations.",
//             "c": "Encrypt all the data so that it is secure.",
//             "d": "Use Shield Platform Encryption as a user authentication or authorization tool."
//         },
//         "correctAnswer": [
//             "b",
//             "c"
//         ],
//         "explanation": "Before implementation, it's crucial to review all configurations, such as key management and encryption policies, to ensure they align with business requirements (B). Additionally, the goal is to encrypt all sensitive data that falls under the policy to ensure it is secure at rest, not just new data (C). Shield Platform Encryption is not an authentication tool.",
//         "multiSelect": true
//     },
//     {
//         "question": "Universal Containers (UC) would like to expose data from on-premise applications, which are behind a corporate network, to Salesforce for a unified user experience. The data must be accessible from Salesforce in real-time. Which two actions should be recommended to fulfill this system requirement?",
//         "answers": {
//             "a": "Develop an application in Heroku that connects to the on-premisedatabase via an ODBC string and VPC connection.",
//             "b": "Develop custom APIs on the company's network that are invokable by Salesforce.",
//             "c": "Deploy MuleSoft to the on-premise network and design externally facing APIs to expose the data.",
//             "d": "Run a batch job with an ETL tool from an on-premise server to move data to Salesforce."
//         },
//         "correctAnswer": [
//             "b",
//             "c"
//         ],
//         "explanation": "Both options provide a way to expose on-premise data via real-time APIs. Developing custom APIs (B) is a direct approach. Using an integration platform like MuleSoft (C) can also achieve this, often with added benefits like security, orchestration, and transformation capabilities. Batch jobs (D) are not real-time.",
//         "multiSelect": true
//     },
//     {
//         "question": "A call center needs to view historical case data which is archived in a separate, performant data store (20M+ records). When reviewing a case in Salesforce, agents need to see the related historical items. Which mechanism and pattern are recommended to maximize declarative configuration?",
//         "answers": {
//             "a": "Use ESB tool with Data Virtualization pattern, expose OData endpoint, and then use Salesforce Connect to consume and display the External Object alongside with the Case object.",
//             "b": "Use an ESB tool with a fire and forget pattern and then publish a platform event for the requested historical data.",
//             "c": "Use an ESB tool with Request-Reply pattern and then make a real-time Apex callout to the ESB endpoint to fetch and display component related to Case object",
//             "d": "Use an ETL tool with a Batch Data Synchronization pattern to migrate historical data into Salesforce and into a custom object (historical data) related to Case object."
//         },
//         "correctAnswer": "a",
//         "explanation": "This scenario is a perfect fit for data virtualization. Salesforce Connect allows you to access data from external systems in real-time without storing it in Salesforce. By having the middleware (ESB) expose the historical data via an OData endpoint, Salesforce Connect can declaratively create an External Object that can be displayed on the Case page layout, avoiding code and data replication.",
//         "multiSelect": false
//     },
//     {
//         "question": "An Architect is asked to build a solution that allows a service to access Salesforce through the API. What is the first thing the Architect should do?",
//         "answers": {
//             "a": "Create a new user with System Administrator profile.",
//             "b": "Authenticate the integration using existing Single Sign-On.",
//             "c": "Authenticate the integration using existing Network-Based Security.",
//             "d": "Create a special user solely for the integration purposes."
//         },
//         "correctAnswer": "d",
//         "explanation": "The best practice for security, accountability, and traceability is to create a dedicated integration user for each integration. This user should be configured with a profile that grants only the minimum necessary permissions for the integration to function (principle of least privilege).",
//         "multiSelect": false
//     },
//     {
//         "question": "Universal Containers (UC) uses Salesforce as the system of record for customers. Customer data also exists in an ERP, ticketing system, and data lake, each with its own unique identifier. UC plans to use middleware and needs to update the proper external system when a Salesforce record changes, and vice versa. Which two solutions should an Integration Architect recommend?",
//         "answers": {
//             "a": "Locally cache external ID'S at the middleware layer and design business logic to map updates between systems.",
//             "b": "Store unique identifiers in an External ID field in Salesforce and use this to update the proper records across systems.",
//             "c": "Use Change Data Capture to update downstream systems accordingly when a record changes.",
//             "d": "Design an MDM solution that maps external ID's to the Salesforce record ID."
//         },
//         "correctAnswer": [
//             "c",
//             "d"
//         ],
//         "explanation": "Change Data Capture (CDC) is a scalable way to publish record changes from Salesforce in near real-time, which the middleware can subscribe to for updating downstream systems (C). For a robust, long-term solution that manages identities across multiple systems, a Master Data Management (MDM) solution is the best practice. MDM creates a central hub to map all identifiers to a master record, ensuring data quality and consistency (D).",
//         "multiSelect": true
//     },
//     {
//         "question": "A company needs to send data from Salesforce to a homegrown system behind a corporate firewall. The data needs to be pushed one way, not in real time, with an average volume of 2 million records per day. What should an integration architect consider when choosing the right option?",
//         "answers": {
//             "a": "Due to high volume of records, number of concurrent requests can hit the limit for the REST API call to external system.",
//             "b": "Due to high volume of records, a third-party integration tool is required to stage records off platform.",
//             "c": "Due to high volume of records, the external system will need to use a BULK API Rest endpoint to connect to salesforce.",
//             "d": "Due to high volume of records, salesforce will need to make a REST API call to external system."
//         },
//         "correctAnswer": "b",
//         "explanation": "Pushing 2 million records per day directly from Salesforce via Apex callouts would quickly exhaust daily API and governor limits. A third-party integration (ETL) tool is designed for such high-volume data movement. It can extract the data from Salesforce efficiently (e.g., using the Bulk API), stage it, and then handle the process of loading it into the on-premise system, managing performance and reliability off-platform.",
//         "multiSelect": false
//     },
//     {
//         "question": "Northern Trail Outfitters (NTO) has recently implemented middleware. The ERP system requires transactions to be captured in near real time at a REST endpoint, initiated when an order is created in Salesforce. The Salesforce team has limited development resources and requires a low-code solution. Which two options will fulfill the use case requirements?",
//         "answers": {
//             "a": "Use Remote Process Invocation fire and forget pattern on insert on the order object using Flow Builder.",
//             "b": "Implement a Workflow Rule with Outbound Messaging to send SOAP messages to the designated endpoint.",
//             "c": "Implement Change Data Capture on the order object and leverage the replay Id in the middleware solution.",
//             "d": "Use a process builder to create a Platform Event, selecting the record type as the Platform Event Name on insert of record."
//         },
//         "correctAnswer": [
//             "a",
//             "c"
//         ],
//         "explanation": "Flow Builder allows for a low-code implementation of a 'fire-and-forget' callout to the REST endpoint (A). Alternatively, Change Data Capture (CDC) is a scalable, near real-time, event-based solution. The middleware can subscribe to the order change events and process them reliably using the replay ID (C). Outbound Messaging (B) is SOAP-based, not REST.",
//         "multiSelect": true
//     },
//     {
//         "question": "A company's single page application consolidates data through synchronous and asynchronous calls. To measure performance, every call's start and finish time is logged (A to H in a diagram showing the flow). Which computation represents the end-to-end response time from the user's perspective?",
//         "answers": {
//             "a": "Sum of A to H",
//             "b": "Sum of A to F",
//             "c": "Sum of A, G, and H",
//             "d": "Sum of A and H"
//         },
//         "correctAnswer": "d",
//         "explanation": "From the user's perspective, the response time is the duration from when they initiate an action until they see the final result on their screen. This corresponds to the initial synchronous call from the UI to the application (A) and the final synchronous call from the application back to the UI (H). The intermediate asynchronous calls (B to G) happen in the background and do not block the user interface, so they are not part of the perceived response time.",
//         "multiSelect": false
//     },
//     {
//         "question": "A Lightning Web Component (LWC) displays transactions from a custom object in Salesforce. This object is updated periodically and may not have all the necessary transactions at any given time. A middleware service provides RESTful APIs that can retrieve all transactions from the source systems. What should the Integration Architect specify so the LWC can display all required transactions?",
//         "answers": {
//             "a": "Call the Enterprise APIs directly from the LWC's JavaScript code and redisplay the LWC on receipt of the API response.",
//             "b": "Let the Lightning Data Service with an wire adapter display new values when the custom object records change.",
//             "c": "Use the Continuation class to call the Enterprise APIs and then process the response in a callback method.",
//             "d": "Publish a Platform Event, have the middleware subscribe and update the custom object on receipt of Platform Event."
//         },
//         "correctAnswer": "a",
//         "explanation": "To get the most up-to-date and complete data, the LWC should make a direct call to the middleware's REST API. This is done from the LWC's JavaScript controller using the Fetch API. Upon receiving the response, the JavaScript can then process the data and re-render the component to display the complete list of transactions to the user. This provides a real-time view without waiting for the periodic replication to Salesforce.",
//         "multiSelect": false
//     },
//     {
//         "question": "A data migration team is decommissioning a legacy CRM and migrating data to Salesforce. They asked for a recommendation to optimize the performance of the data load. Which approach should be used to meet the requirement?",
//         "answers": {
//             "a": "Use Bulk API to process jobs in parallel mode.",
//             "b": "Contact Salesforce support to schedule performance load.",
//             "c": "Use Bulk API to process jobs in serial mode.",
//             "d": "Use Bulk API to process jobs in high performance mode."
//         },
//         "correctAnswer": "a",
//         "explanation": "The Bulk API is designed for loading large data sets. To maximize performance, jobs should be processed in parallel mode. This allows Salesforce to process multiple batches from the job simultaneously, significantly speeding up the overall data load time compared to serial mode, which processes one batch at a time.",
//         "multiSelect": false
//     },
//     {
//         "question": "An architect needs to integrate three separate external systems with Salesforce and wants to ensure proper security, auditing, and monitoring for each. What is the best practice to achieve this?",
//         "answers": {
//             "a": "A shared integration user for the three external system integrations.",
//             "b": "A shared Connected App for the three external system integrations.",
//             "c": "A unique integration user for each external system integration.",
//             "d": "A Connected App for each external system integration."
//         },
//         "correctAnswer": "d",
//         "explanation": "Using a separate Connected App for each external system provides the most granular control and visibility. Each Connected App can have its own OAuth policies (IP restrictions, refresh token policies), and API usage is tracked separately, which simplifies monitoring, auditing, and troubleshooting for each specific integration.",
//         "multiSelect": false
//     },
//     {
//         "question": "Northern Trail Outfitters needs to make synchronous callouts to 'available to promise' services to query product availability and reserve inventory during customer checkout. Which two considerations should an integration architect make when building a scalable integration solution?",
//         "answers": {
//             "a": "The typical and worst-case historical response times.",
//             "b": "The number batch jobs that can run concurrently.",
//             "c": "How many concurrent service calls are being placed.",
//             "d": "The maximum query cursors open per user on the service."
//         },
//         "correctAnswer": [
//             "a",
//             "c"
//         ],
//         "explanation": "For a synchronous callout during a user process like checkout, performance is critical. The architect must know the response times of the external service to set appropriate timeouts and manage user experience (A). They must also understand the volume of concurrent calls to ensure the solution can handle peak load without hitting Salesforce or external system limits (C).",
//         "multiSelect": true
//     },
//     {
//         "question": "An integration uses Platform Events to send leads to a third-party AI system, which returns a prediction score. A trigger on the Platform Event that receives the score back is failing in Production. What type of monitoring should the Integration Consultant have considered?",
//         "answers": {
//             "a": "Monitor Platform Events created per hour limits across the Salesforce instance.",
//             "b": "Set up debug logs for Platform Event triggers to monitor performance.",
//             "c": "Validate the Platform Event definition matches leads definition.",
//             "d": "Monitor the volume of leads that are created in Salesforce."
//         },
//         "correctAnswer": "a",
//         "explanation": "Platform Events have publishing and delivery limits that are enforced on an hourly basis. A common reason for failures in a high-volume production environment is exceeding these allocation limits. Proactive monitoring of the 'HourlyPublishedPlatformEvents' limit would have helped anticipate this issue.",
//         "multiSelect": false
//     },
//     {
//         "question": "A mobile application for Salesforce users needs a new feature to obtain the device's GPS coordinates and store them on a custom geolocation field. The field is secured with Field Level Security (FLS) so users can only view it, not edit it. The app is already secured with OAuth. What should be done to meet the requirement?",
//         "answers": {
//             "a": "The mobile device makes a SOAP API inbound call. The mobile device receives a REST Apex callout call.",
//             "b": "The mobile device makes a REST API inbound call.",
//             "c": "The mobile device makes a REST Apex inbound call."
//         },
//         "correctAnswer": "c",
//         "explanation": "Since FLS prevents the user from directly editing the field, a standard REST API update call would fail. The solution is to create a custom Apex REST Service. The mobile app makes an inbound call to this service. The Apex class then runs in system context (without sharing), which allows it to bypass the FLS and update the field with the provided GPS coordinates.",
//         "multiSelect": false
//     },
//     {
//         "question": "A large enterprise in a regulated industry is integrating Salesforce with multiple critical back-office systems. Reliability and monitoring of these integrations are required. Which integration solution should the architect consider?",
//         "answers": {
//             "a": "Architect Services in back-office systems to support callouts from Salesforce and build reliability, monitoring and reporting capabilities.",
//             "b": "Decouple back-office system callouts into separate distinct services that have inbuilt error logging and monitoring frameworks.",
//             "c": "Build a custom integration gateway to support back-office system integrations and ensure reliability and monitoring capabilities.",
//             "d": "Leverage Middleware for all back-office system integrations ensuring real time alerting, monitoring and reporting capabilities."
//         },
//         "correctAnswer": "d",
//         "explanation": "For a complex landscape with critical integrations requiring high reliability and monitoring, a dedicated middleware platform is the best practice. Middleware provides a centralized layer for handling data transformation, routing, security, and, crucially, robust error handling, logging, monitoring, and alerting capabilities out of the box.",
//         "multiSelect": false
//     },
//     {
//         "question": "A company is rolling out Salesforce to all Sales and Service staff. Senior Management has requested that monitoring be in place for Operations to be notified of any degradation in Salesforce performance. How should an integration consultant implement monitoring?",
//         "answers": {
//             "a": "Use Salesforce limits API to capture current API usage and configure alerts for monitoring.",
//             "b": "Use APIEVENT to track all user-initiated API calls through SOAP, REST or BULK APIs.",
//             "c": "Identify critical business processes and establish automation to monitor performance against established benchmarks.",
//             "d": "Request Salesforce to monitor the Salesforce instance and notify when there is degradation in performance."
//         },
//         "correctAnswer": "c",
//         "explanation": "Effective performance monitoring isn't just about technical limits; it's about business impact. The best approach is to identify the most critical business processes (e.g., 'Create a Quote', 'Save a Case'), establish performance benchmarks for them, and then use automation (e.g., synthetic monitoring tools) to continuously test these processes and alert when performance degrades.",
//         "multiSelect": false
//     },
//     {
//         "question": "A large enterprise is implementing Sales Cloud. Business requirements include accessing current inventory, generating quotes with pricing from the ERP, accessing invoices, and using an external BI tool for dashboards. The MDM is the system of record for customers. Which systems must be integrated with Salesforce?",
//         "answers": {
//             "a": "ERP, MDM, BI tool and Data Warehouse",
//             "b": "ERP, Inventory, Pricing Engine, Invoices system",
//             "c": "ERP, MDM, Data Warehouse, Invoices system",
//             "d": "ERP, Invoices system, Data Warehouse and BI Tool"
//         },
//         "correctAnswer": "a",
//         "explanation": "Based on the requirements: 1) Pricing and Invoices are in the ERP. 2) Customer data comes from the MDM. 3) Dashboards are in the BI tool, which needs sales data from Salesforce. 4) Inventory data might be in the ERP or a separate system, but ERP is the common source. A Data Warehouse is often used to feed the BI tool. Therefore, integrating with ERP, MDM, and providing data to the BI tool (often via a Data Warehouse) are the key integration points.",
//         "multiSelect": false
//     },
//     {
//         "question": "An integration requires all Apex REST API clients to adhere to RAML specifications, which serve as interface contracts. Which two design specifications should the architect include to ensure that Apex unit tests confirm adherence to the RAML specs?",
//         "answers": {
//             "a": "Call the Apex REST API Clients in a test context to get the mock response.",
//             "b": "Require the Apex REST API Clients to implement the HttpCalloutMock.",
//             "c": "Call the HttpCalloutMock implementation from the Apex REST API Clients.",
//             "d": "Implement HttpCalloutMock to return responses per RAML specification."
//         },
//         "correctAnswer": [
//             "a",
//             "d"
//         ],
//         "explanation": "To test a callout, you must use a mock response. The architect should specify that a class implementing the HttpCalloutMock interface be created, and that this class must return mock HTTP responses that strictly follow the RAML specification (D). The unit test for the client class must then invoke the callout method within a test context (Test.startTest()/stopTest()) so that the mock implementation is used instead of making a real callout (A).",
//         "multiSelect": true
//     },
//     {
//         "question": "An architect recommended using Apex code to make callouts to an external system to process an insurance quote. What governor limit should the integration architect consider to make sure this is the right option for the integration?",
//         "answers": {
//             "a": "The maximum callouts in a single Apex transaction.",
//             "b": "The maximum number of parallel Apex callouts in a single continuation.",
//             "c": "The limit on long-running requests (total execution time).",
//             "d": "The limit of pending operations in the same transaction."
//         },
//         "correctAnswer": "a",
//         "explanation": "A key governor limit for Apex callouts is the number of callouts allowed in a single transaction (currently 100). The architect must evaluate if the business process for processing a quote will ever require more than this limit within one execution context. If so, an asynchronous pattern or a different integration approach may be needed.",
//         "multiSelect": false
//     },
//     {
//         "question": "An integration is being set up between a Salesforce org and an external data source using Salesforce Connect. The external data source supports Open Data Protocol (OData). Which three configurations should an Integration Architect recommend to secure requests coming from Salesforce?",
//         "answers": {
//             "a": "Configure Identity Type for OData connection.",
//             "b": "Configure a Certificate for OData connection.",
//             "c": "Configure Special Compatibility for OData connection.",
//             "d": "Configure CSRF Protection for OData connection.",
//             "e": "Configure CSRF Protection on External Data Source."
//         },
//         "correctAnswer": [
//             "a",
//             "b",
//             "d"
//         ],
//         "explanation": "To secure the connection, you must configure the authentication method using the 'Identity Type' setting (e.g., Named Principal, OAuth 2.0) (A). To protect data in transit, you can use a 'Certificate' for SSL/TLS encryption (B). To prevent cross-site request forgery attacks, you should enable the 'CSRF Protection' setting on the External Data Source definition in Salesforce (D).",
//         "multiSelect": true
//     },
//     {
//         "question": "A company needs to check customer communication preferences from an external service in real-time within a Lightning Flow. The external service exposes a REST API with an OpenAPI 2.0 specification. The flow needs Boolean and string values back to make decisions. Which pattern and mechanism is most suitable?",
//         "answers": {
//             "a": "Fire and Forget: Process-driven platform events publishes events on Salesforce Event Bus.",
//             "b": "Remote Call-In: Salesforce REST API with REST Composite Resources.",
//             "c": "Request-Reply: Enhanced External Services invokes a REST API.",
//             "d": "Data Virtualization: Salesforce Connect map data external REST data in external objects."
//         },
//         "correctAnswer": "c",
//         "explanation": "Enhanced External Services is designed for this exact use case. It allows you to declaratively register an external service using its OpenAPI spec and then invoke its methods as actions directly within a Flow. This fits the synchronous Request-Reply pattern needed to get an immediate response for the flow's logic, all without writing Apex code.",
//         "multiSelect": false
//     },
//     {
//         "question": "Which three considerations should an Integration Architect consider when recommending Platform Event as an Integration solution?",
//         "answers": {
//             "a": "Inability to query event messages using SOQL",
//             "b": "Subscribe to an AssetToken Event stream to monitor OAuth2.0 authentication activity.",
//             "c": "Inability to create a Lightning record page for platform events.",
//             "d": "When you delete an event definition, it's permanently removed and can't be restored.",
//             "e": "You can use Event Monitoring to track user activity, such as logins and running reports."
//         },
//         "correctAnswer": [
//             "a",
//             "c",
//             "d"
//         ],
//         "explanation": "When proposing Platform Events, an architect must highlight their characteristics and limitations. Key considerations include: event messages are not stored in standard objects and thus cannot be queried via SOQL (A); they are not data objects and do not have record pages (C); and deleting an event's definition is a permanent, irreversible metadata change (D).",
//         "multiSelect": true
//     },
//     {
//         "question": "An integration solution uses the REST API to update Account, Contact, and other related information. Data volumes have increased, and daily API call limits are being exceeded. The customer wants to decrease the number of API calls using bulk updates but prefers to continue using the REST API. Which REST API composite resource should the architect use to allow up to 200 records in one API call?",
//         "answers": {
//             "a": "SObject Collections",
//             "b": "SObject Tree",
//             "c": "Batch",
//             "d": "Composite"
//         },
//         "correctAnswer": "a",
//         "explanation": "The SObject Collections resource is specifically designed for creating, updating, or deleting a collection of records of the same SObject type in a single request. It supports up to 200 records per call, making it ideal for bulk operations on unrelated records and reducing API call consumption.",
//         "multiSelect": false
//     },
//     {
//         "question": "A company accepts payment requests 24x7. Their SLA requires every request to be processed by their Payment System. They are encountering intermittent update errors when multiple processes try to update the same Payment Request record simultaneously. Which two recommendations should an integration architect make to improve SLA and handle update conflicts?",
//         "answers": {
//             "a": "Middleware should coordinate request delivery and payment processing.",
//             "b": "Data Entry Point and Middleware should automatically retry requests.",
//             "c": "Payment System should process a payment request only once.",
//             "d": "Payment System and Middleware should automatically retry requests."
//         },
//         "correctAnswer": [
//             "a",
//             "c"
//         ],
//         "explanation": "Using middleware to mediate and coordinate the flow of requests ensures reliable, ordered delivery and can manage retries centrally, preventing a chaotic free-for-all (A). To prevent duplicate processing and handle race conditions, the Payment System itself must be idempotent—it should use the globally unique identifier to ensure that it processes any given payment request exactly once, regardless of how many times it receives the request (C).",
//         "multiSelect": true
//     },
//     {
//         "question": "A customer imports data into Salesforce using the Bulk API in parallel mode with a batch size of 2000. Batches frequently fail with the error 'Max CPU time exceeded'. A smaller batch size will fix this error. Which two options should be considered as potential side effects of using a smaller batch size?",
//         "answers": {
//             "a": "Smaller batch size may cause record-locking errors.",
//             "b": "Smaller batch size may increase time required to execute bulk jobs.",
//             "c": "Smaller batch size may exceed the concurrent API request limits.",
//             "d": "Smaller batch size can trigger 'Too many concurrent batches' error."
//         },
//         "correctAnswer": [
//             "a",
//             "b"
//         ],
//         "explanation": "Reducing the batch size means more batches will be created for the same amount of data. This increases the overall processing overhead and can extend the total job execution time (B). Additionally, having more, smaller batches running in parallel increases the likelihood of two batches attempting to lock the same parent record or related records, leading to record-locking errors (A).",
//         "multiSelect": true
//     },
//     {
//         "question": "Northern Trail Outfitters (NTO) uses a custom mobile app with Salesforce Chatter Feeds. NTO wants to automatically post a Chatter item to Twitter whenever the post includes the #thanksNTO hashtag. Which API should an Integration Architect use to meet this requirement?",
//         "answers": {
//             "a": "Connect REST API",
//             "b": "REST API",
//             "c": "Streaming API",
//             "d": "Apex REST"
//         },
//         "correctAnswer": "a",
//         "explanation": "The Connect REST API is specifically designed for accessing Chatter feeds and social data like users, groups, and files. It is the most direct and feature-rich API for interacting with Chatter content, making it the ideal choice for a process that needs to read Chatter posts.",
//         "multiSelect": false
//     },
//     {
//         "question": "A B2C company is expanding to Latin America and must be able to completely delete a customer's personal data on demand, in compliance with anticipated privacy regulations. Data is stored in legacy mainframes, Salesforce Clouds (Commerce, Service, etc.), and other systems. Which three requirements should the integration architect prioritize?",
//         "answers": {
//             "a": "Manual steps and procedures that may be necessary.",
//             "b": "Impact of deleted records on system functionality.",
//             "c": "Ability to delete personal data in every system.",
//             "d": "Feasibility to restore deleted records when needed.",
//             "e": "Ability to provide a 360-degree view of the customer."
//         },
//         "correctAnswer": [
//             "a",
//             "b",
//             "c"
//         ],
//         "explanation": "First, the solution must technically be able to delete data in every single system where it resides (C). The architect must analyze the downstream impact of these deletions on system functionality, such as reporting or related records (B). Given the complexity and legacy systems involved, it's also critical to identify and document any necessary manual steps or procedures that cannot be automated to ensure the process can be completed successfully (A).",
//         "multiSelect": true
//     },
//     {
//         "question": "A company wants to standardize exception tracking. The plan is to build a company-wide logging service on middleware, create Salesforce Case records for exceptions based on certain thresholds, and change all Apex Loggers to publish exceptions as custom Platform Events. Which two specifications should the architect include in the logging service architecture?",
//         "answers": {
//             "a": "Receive Application Events through Change Data Capture (CDC).",
//             "b": "Create Salesforce Cases using the Salesforce REST, SOAP or Bulk API.",
//             "c": "Create Salesforce Cases conditionally using automatic Case creation rules.",
//             "d": "Subscribe to the Application Exceptions using the Salesforce Streaming API."
//         },
//         "correctAnswer": [
//             "b",
//             "d"
//         ],
//         "explanation": "The logging service, which is external to Salesforce, needs to listen for the Application Exception Platform Events. It can do this by subscribing to the event channel using the Streaming API (CometD) (D). Once the service receives an event and determines a Case is needed, it will act as an API client and use a standard inbound API (like REST or SOAP) to create the Case record in Salesforce (B).",
//         "multiSelect": true
//     },
//     {
//         "question": "Customer Support agents need seamless access to customer billing information from an Enterprise Billing System (EBS) and view generated bills from a Document Management System (DMS). Only authorized users are allowed access to these systems. Which three authorization and authentication needs should an integration consultant consider?",
//         "answers": {
//             "a": "Users should be authorized to view information specific to the customer they are servicing without a need to search for customer.",
//             "b": "Identify options to maintain DMS and EBS authentication and authorization details in Salesforce.",
//             "c": "Consider Enterprise security needs for access to DMS and EBS.",
//             "d": "Consider options to migrate DMS and EBS into Salesforce.",
//             "e": "Users should be authenticated into DMS and EBS without having to enter username and password."
//         },
//         "correctAnswer": [
//             "a",
//             "c",
//             "e"
//         ],
//         "explanation": "The solution must be seamless, so users should not have to log in again, indicating a need for Single Sign-On (SSO) (E). The access should be contextual, automatically showing billing info for the customer record being viewed in Salesforce (A). Finally, the entire solution must comply with the broader enterprise security policies for accessing these critical systems (C).",
//         "multiSelect": true
//     },
//     {
//         "question": "What is the first thing an Integration Architect should validate if a callout from a Lightning Web Component to an external endpoint is failing?",
//         "answers": {
//             "a": "The endpoint domain has been added to Cross-Origin Resource Sharing.",
//             "b": "The endpoint URL has been added to Content Security Policies.",
//             "c": "The endpoint URL has added been to an outbound firewall rule.",
//             "d": "The endpoint URL has been added to Remote Site Settings."
//         },
//         "correctAnswer": "a",
//         "explanation": "Callouts made directly from a browser-side component like an LWC are subject to the browser's same-origin policy. For the callout to a different domain to succeed, that domain must be registered in Salesforce's Cross-Origin Resource Sharing (CORS) allowlist. A missing CORS entry is the most common reason for these callouts to be blocked by the browser.",
//         "multiSelect": false
//     },
//     {
//         "question": "When an order is marked as 'Fulfilled' in Salesforce, all order and line item data must be sent to an existing finance application's web service for invoicing. The business requires a guarantee that each fulfilled order reaches the finance application exactly once. Which integration approach meets these requirements?",
//         "answers": {
//             "a": "Trigger invokes Queueable Apex method, with custom error handling process.",
//             "b": "Trigger makes @future Apex method, with custom error handling process.",
//             "c": "Button press invokes synchronous callout, with user handling retries in case of error",
//             "d": "Outbound Messaging, which will automatically handle error retries to the service."
//         },
//         "correctAnswer": "a",
//         "explanation": "Queueable Apex is superior to @future for this use case because it allows for more complex logic, chaining jobs, and better error handling. By invoking a Queueable job from a trigger, the process is asynchronous. Within the Queueable class, the developer can implement custom error handling and retry logic, and by implementing the Database.Stateful interface, can track the job's state to ensure the 'exactly once' delivery requirement is met.",
//         "multiSelect": false
//     },
//     {
//         "question": "A customer is evaluating Platform Events and Outbound Messages for a near-real time integration with 3,000 consumers. Which three considerations should be evaluated when deciding between the solutions?",
//         "answers": {
//             "a": "Both Platform Events and Outbound Message offer declarative means for asynchronous near-real time needs. They aren't best suited for real-time integrations.",
//             "b": "In both Platform Events and Outbound Messages, the event messages are retried by and delivered in sequence, and only once. Salesforce ensures there is no duplicate message delivery.",
//             "c": "Message sequence is possible in Outbound Message but not guaranteed with Platform Events. Both offer very high reliability. Fault handling and recovery are fully handled by Salesforce.",
//             "d": "Number of concurrent subscribers to Platform Events is capped at 2,000. An Outbound Message configuration can pass only 100 notifications in a single message to a SOAP end point.",
//             "e": "Both Platform Events and Outbound Message are highly scalable. However, unlike Outbound Message, only Platform Events have Event Delivery and Event Publishing limits to be considered."
//         },
//         "correctAnswer": [
//             "a",
//             "c",
//             "e"
//         ],
//         "explanation": "Both are asynchronous, near-real-time solutions that can be configured declaratively (A). A key difference is that Outbound Message guarantees in-order delivery, while Platform Events do not (C). Finally, it's crucial to know that Platform Events are subject to specific publishing and delivery limits based on the org's license, whereas Outbound Messages have different types of limits (E). The number of subscribers (3,000) is also a critical factor, as standard Platform Events have a concurrent subscriber limit of 2,000 (mentioned in option D, though D is not a correct comparison overall).",
//         "multiSelect": true
//     },
//     {
//         "question": "Northern Trail Outfitters needs to present shipping costs and estimated delivery times to their customers. Shipping services used vary by region, and have similar but distinct service request parameters. Which integration component capability should be used?",
//         "answers": {
//             "a": "Enterprise Service Bus to determine which shipping service to use, and transform requests to the necessary format.",
//             "b": "Outbound Messaging to request costs and delivery times from Shipper delivery services with automated error retry.",
//             "c": "APEX REST Service to implement routing logic to the various shipping service.",
//             "d": "Enterprise Service Bus user interface to collect shipper-specific form data."
//         },
//         "correctAnswer": "a",
//         "explanation": "Using an Enterprise Service Bus (ESB) is the best solution because it can provide routing, transformation, mediation, and orchestration capabilities for integrating different services. An ESB abstracts the complexity of the various shipping services from the main application, simplifying the integration.",
//         "multiSelect": false
//     },
//     {
//         "question": "Northern Trail Outfitters (NTO) uses different shipping services for each of the 34 countries it serves. Services are added and removed frequently to optimize shipping times and costs. Sales Representatives serve all NTO customers globally and need to select between valid service(s) for the customer's country and request shipping estimates from that service. Which two solutions should an architect propose?",
//         "answers": {
//             "a": "Use Platform Events to construct and publish shipper-specific events.",
//             "b": "Invoke middleware service to retrieve valid shipping methods.",
//             "c": "Use middleware to abstract the call to the specific shipping services.",
//             "d": "Store shipping services in a picklist that is dependent on a country picklist."
//         },
//         "correctAnswer": [
//             "b",
//             "c"
//         ],
//         "explanation": "A middleware service can act as a single point of entry to retrieve valid shipping methods for a given country. It can also abstract the complexity of calling the specific shipping services, handling the different request/response formats and hiding the heterogeneity of the underlying systems from Salesforce.",
//         "multiSelect": true
//     },
//     {
//         "question": "An integration architect needs to build a solution that will be using the Streaming API, but the data loss should be minimized, even when the client re-connects every couple of days. Which two types of Streaming API events should be considered?",
//         "answers": {
//             "a": "Generic Events",
//             "b": "Change Data Capture Events",
//             "c": "Push Topic Events",
//             "d": "High Volume Platform Events"
//         },
//         "correctAnswer": [
//             "b",
//             "d"
//         ],
//         "explanation": "Both Change Data Capture (CDC) Events and High Volume Platform Events support reliable event delivery. This means events are stored for up to 72 hours and can be replayed by subscribers using a replay ID if they disconnect, which minimizes data loss.",
//         "multiSelect": true
//     },
//     {
//         "question": "A company needs to integrate a legacy on premise application that can only support SOAP API. After the Integration Architect has evaluated the requirements and volume, they determined that the Fire and Forget integration pattern will be most appropriate for sending data from Salesforce to the external application and getting response back in a strongly typed format. Which integration capabilities should be used to integrate the two systems?",
//         "answers": {
//             "a": "Outbound Message for Salesforce to Legacy System direction and SOAP API using Enterprise WSDL for the communication back from legacy system to salesforce.",
//             "b": "Platform Events for Salesforce to Legacy System direction and SOAP API using Partner WSDL for the communication back from legacy system to salesforce.",
//             "c": "Platform Events for Salesforce to Legacy System direction and SOAP API using Enterprise WSDL for the communication back from legacy system to salesforce.",
//             "d": "Outbound Message for Salesforce to Legacy System direction and SOAP API using Partner WSDL for the communication back from legacy system to salesforce."
//         },
//         "correctAnswer": "a",
//         "explanation": "Outbound Message is a declarative, SOAP-based feature that fits the 'Fire and Forget' pattern for sending data from Salesforce. For the return communication, the Enterprise WSDL should be used because it is strongly typed, meaning it's tied to a specific Salesforce configuration, which matches the requirement for a 'strongly typed format'.",
//         "multiSelect": false
//     },
//     {
//         "question": "A company in a heavily regulated industry requires data in legacy systems to be displayed in Salesforce user interfaces (UIs). They are proficient in their cloud-based ETL (extract, transform, load) tools. They expose APIs built on their on-premise middleware to cloud and on-premise applications. Which two findings about their current state will allow copies of legacy data in Salesforce?",
//         "answers": {
//             "a": "Only on-premise systems are allowed access to legacy systems.",
//             "b": "Cloud-based ETL can access Salesforce and supports queues.",
//             "c": "On-premise middleware provides APIs to legacy systems data.",
//             "d": "Legacy systems can use queues for on-premise integration."
//         },
//         "correctAnswer": [
//             "b",
//             "c"
//         ],
//         "explanation": "The fact that the on-premise middleware provides APIs to the legacy data (C) means the data is accessible. The fact that their cloud-based ETL tool can access Salesforce (B) means they have a mechanism to move that accessible data into Salesforce. These two findings together confirm the feasibility of the project.",
//         "multiSelect": true
//     },
//     {
//         "question": "An architect decided to use Platform Events for integrating Salesforce with an external system for a company. Which three things should an architect consider when proposing this type of integration mechanism?",
//         "answers": {
//             "a": "To subscribe to an event, the integration user in Salesforce needs read access to the event entity.",
//             "b": "Salesforce needs to be able to store information about the external system in order to know which event to send out.",
//             "c": "External system needs to have the same uptime in order to be able to keep up with Salesforce Platform Events.",
//             "d": "To publish an event, the integration user in salesforce needs create permission on the event entity.",
//             "e": "Error handling must be performed by the remote service because the event is effectively handed off to the remote system for further processing."
//         },
//         "correctAnswer": [
//             "a",
//             "d",
//             "e"
//         ],
//         "explanation": "Using Platform Events requires the integration user to have 'Create' permission on the event object to publish events and 'Read' permission to subscribe to them. Because Platform Events follow a 'fire-and-forget' model, Salesforce does not guarantee delivery or acknowledgment; therefore, any error handling must be implemented by the subscribing remote system.",
//         "multiSelect": true
//     },
//     {
//         "question": "A developer has been tasked by the integration architect to build a solution based on the Streaming API. The developer has done some research and has found there are different implementations of the events in Salesforce (Push Topic Events, Change Data Capture, Generic Streaming, Platform Events), but is unsure of to proceed with the implementation. The developer asks the system architect for some guidance. What should the architect consider when making the recommendation?",
//         "answers": {
//             "a": "Push Topic Event can define a custom payload.",
//             "b": "Change Data Capture can be published from Apex.",
//             "c": "Apex triggers can subscribe to Generic Events."
//         },
//         "correctAnswer": "a",
//         "explanation": "One key differentiator is that Push Topic Events allow for a custom payload. They are based on a SOQL query, and you can specify the exact fields to be returned in the event message using the SELECT clause. This allows you to customize the payload according to your integration needs. *Note: The source document provides 'B' as the answer but gives an explanation for 'A'. The explanation for 'A' is correct, while 'B' is incorrect as CDC events are published by the platform, not Apex. This response uses the correct answer based on the explanation.*",
//         "multiSelect": false
//     },
//     {
//         "question": "Universal Containers (UC) currently owns a middleware tool and they have developed an API-led integration architecture with three API tiers. The first-tier interfaces directly with the systems of engagement, the second tier implements business logic and aggregates data, while the third-tier interfaces directly with systems of record. Some of the systems of engagement will be a mobile application, a web application, and Salesforce. UC has a business requirement to return data to the systems of engagement in different formats while also enforcing different security protocols. What should an Integration Architect recommend to meet these requirements?",
//         "answers": {
//             "a": "Enforce separate security protocols and return formats at the first tier of the API-led architecture.",
//             "b": "Implement an API gateway that all systems of engagement must interface with first.",
//             "c": "Enforce separate security protocols and return formats at the second tier of the API-led architecture.",
//             "d": "Leverage an Identity Provider solution that communicates with the API tiers via SAML"
//         },
//         "correctAnswer": "a",
//         "explanation": "The first tier in an API-led architecture is the 'Experience Layer'. Its purpose is to provide a tailored interface for each system of engagement (e.g., mobile app, web app). It is the ideal place to handle transformations for different data formats and enforce security protocols specific to each consuming application.",
//         "multiSelect": false
//     },
//     {
//         "question": "What should an Architect recommend to ensure all integrations to the Northern Trail Outfitters company portal use SSL mutual authentication?",
//         "answers": {
//             "a": "Enable My Domain and SSL/TLS.",
//             "b": "Enforce SSL/TLS Mutual Authentication.",
//             "c": "Generate a Self-signed Certificate.",
//             "d": "Generate a CA-signed Certificate."
//         },
//         "correctAnswer": "b",
//         "explanation": "To ensure all integrations use mutual authentication, the specific user permission 'Enforce SSL/TLS Mutual Authentication' must be assigned to the integration users. This forces the client to present a valid certificate that Salesforce can verify, in addition to the standard server certificate verification.",
//         "multiSelect": false
//     },
//     {
//         "question": "When designing an integration between Salesforce and an order fulfillment system using Outbound Messaging, which two key questions should an integration architect consider?",
//         "answers": {
//             "a": "Can the fulfillment system create new addresses within the Order Create service?",
//             "b": "Can the fulfillment system make a callback into Salesforce?",
//             "c": "Can the fulfillment system implement a contract-first Outbound Messaging interface?",
//             "d": "Is the product catalog data identical at all times in both systems?"
//         },
//         "correctAnswer": [
//             "b",
//             "c"
//         ],
//         "explanation": "For a robust integration, the architect needs to confirm if the fulfillment system can implement a listener based on the WSDL provided by Salesforce (contract-first) (C). Additionally, confirming if the system can make a callback to Salesforce (B) is crucial for updating the order status in Salesforce after the fulfillment system has processed the order.",
//         "multiSelect": true
//     },
//     {
//         "question": "Northern Trail Outfitters has recently experienced intermittent network outages in its call center. When network service resumes, Sales representatives have inadvertently created duplicate orders in the manufacturing system because the order was placed but the return acknowledgement was lost during the outage. Which solution should an architect recommend to avoid duplicate order booking?",
//         "answers": {
//             "a": "Use Outbound Messaging to ensure manufacturing acknowledges receipt of order.",
//             "b": "Use scheduled apex to query manufacturing system for potential duplicate or missing orders.",
//             "c": "Implement idempotent design and have Sales Representatives retry order(s) in question.",
//             "d": "Have scheduled Apex resubmit orders that do not have a successful response."
//         },
//         "correctAnswer": "c",
//         "explanation": "An idempotent design ensures that making the same request multiple times produces the same result as making it once. This is perfect for scenarios with network failures. If an order submission is retried, the manufacturing system would recognize it (e.g., via a unique transaction ID) and not create a duplicate order.",
//         "multiSelect": false
//     },
//     {
//         "question": "A large consumer goods manufacturer operating in multiple countries is planning to implement Salesforce. They have various security requirements for internal users, customers, and partners across different systems. Which three aspects should the integration architect evaluate while designing the integration needs of this project?",
//         "answers": {
//             "a": "Evaluate Salesforce solution for customers and for partners, using third party solution for internal users.",
//             "b": "Assess security requirements for internal systems and decide Integration methods that support the requirements.",
//             "c": "Evaluate the build of a custom authentication mechanism for users in each country and support for customers and partners.",
//             "d": "Consider Third party Single Sign On solution supporting all user authentication including customer and partner.",
//             "e": "Evaluate Salesforce native authentication mechanism for all users including customers and partners."
//         },
//         "correctAnswer": [
//             "b",
//             "c",
//             "e"
//         ],
//         "explanation": "The architect must assess security for integrated internal systems like the ERP (B). Given the diverse requirements (local Active Directory, Google login, etc.), they must evaluate building a custom authentication solution (C) and also consider the capabilities and limitations of Salesforce's native authentication features (E) to find the right mix of solutions.",
//         "multiSelect": true
//     },
//     {
//         "question": "A customer is migrating from an old legacy system to Salesforce. As part of the modernization effort, they would like to integrate all existing systems that currently work with their legacy application with Salesforce. Which three constraints and pain-points should an integration architect consider when choosing the integration pattern/mechanism?",
//         "answers": {
//             "a": "System types - APIs, File systems, Email",
//             "b": "Reporting and usability requirements",
//             "c": "Multi-language and multi-currency requirement",
//             "d": "Error handling mechanisms",
//             "e": "Data Volume and Processing volume"
//         },
//         "correctAnswer": [
//             "a",
//             "d",
//             "e"
//         ],
//         "explanation": "When integrating with multiple existing systems, the architect must consider the types of interfaces available (APIs, files, etc.) (A), the expected data and transaction volumes to ensure scalability (E), and how errors will be handled across these disparate systems to ensure reliability (D).",
//         "multiSelect": true
//     },
//     {
//         "question": "Northern Trail Outfitters is planning to create a native employee facing mobile app with the look and feel of Salesforce's Lighting Experience. The mobile app needs to integrate with their Salesforce org. Which Salesforce API should be used to implement this integration?",
//         "answers": {
//             "a": "Streaming API",
//             "b": "REST API",
//             "c": "Connect REST API",
//             "d": "User Interface API"
//         },
//         "correctAnswer": "d",
//         "explanation": "The User Interface API is specifically designed to build native mobile apps and custom web apps with the Salesforce look and feel. It provides access to metadata, data, and UI components like layouts and actions, handling the rendering logic so the developer doesn't have to.",
//         "multiSelect": false
//     },
//     {
//         "question": "A training company needs to verify trainer credentials from 10 different accreditation agencies before they can provide training. Each agency has its own web service and response times can take days. What is the recommended approach to automate this process?",
//         "answers": {
//             "a": "Use Salesforce external service to make the call out, Salesforce external service should check the verification agencies until the result is verified, then update the trainer status to 'verified'.",
//             "b": "Create a trigger on the trainer record to make a Callout to each verification agencies, write business logic to consolidate the verification then update the trainer status to verified'.",
//             "c": "Make an apex callout using @future annotation to make the call out to all different agencies. The response should update the trainer status to 'verified'.",
//             "d": "Use middleware to handle the call out to the 10 different verification services, the middleware will handle the business logic of consolidating the verification result from the 10 services, then make a call-in to salesforce and update the verification status to 'verified'."
//         },
//         "correctAnswer": "d",
//         "explanation": "This is a complex, long-running process (orchestration) involving multiple external systems. Middleware is the ideal solution as it is designed to handle such complexity. It can manage the asynchronous callouts to all 10 services, consolidate the results over several days, handle errors and retries, and then make a single, clean call back to Salesforce to update the record.",
//         "multiSelect": false
//     },
//     {
//         "question": "A business needs to check and update the phone number type (mobile vs. landline) for up to 100,000 incoming calls per day. The check is done via an external service API. This process can be done in batches overnight. A Remote-Call-In pattern via middleware has been selected. Which component should an integration architect recommend to implement this pattern?",
//         "answers": {
//             "a": "Connected App configured in Salesforce to authenticate the middleware.",
//             "b": "Configure Remote Site Settings in Salesforce to authenticate the middleware.",
//             "c": "An API Gateway that authenticates requests from Salesforce into the Middleware (ETL/ESB).",
//             "d": "Firewall and reverse proxy are required to protect internal APIs and resource being exposed."
//         },
//         "correctAnswer": "a",
//         "explanation": "In a Remote-Call-In pattern, an external system (the middleware) calls into Salesforce. A Connected App is the modern framework for enabling external applications to integrate with Salesforce APIs. It uses standard protocols like OAuth 2.0 to securely authenticate the middleware and authorize its access to Salesforce data.",
//         "multiSelect": false
//     },
//     {
//         "question": "Which WSDL should an architect consider when creating an integration that might be used for more than one Salesforce organization and different metadata?",
//         "answers": {
//             "a": "Corporate WSDL",
//             "b": "Partner WSDL",
//             "c": "SOAP API WSDL",
//             "d": "Enterprise WSDL"
//         },
//         "correctAnswer": "b",
//         "explanation": "The Partner WSDL is loosely typed and static. It is not tied to a specific Salesforce org's configuration. This makes it ideal for building integrations that are intended to work across multiple Salesforce orgs, as it can adapt to different metadata and custom objects at runtime.",
//         "multiSelect": false
//     },
//     {
//         "question": "Universal Containers is planning to implement Salesforce as their CRM, replacing several existing systems for leads, contacts, and activities. Inventory and billing remain in their ERP. The goal is a single view of the customer. What should an Integration Consultant consider first to support the proposed CRM system strategy?",
//         "answers": {
//             "a": "Plan for migration of customer and sales data across systems on a regular basis to keep them in sync.",
//             "b": "Evaluate current and future data and system usage and then identify potential integration requirements to Salesforce.",
//             "c": "Explore Out of box Salesforce connectors for integration with ERP, Marketing and Microsoft Outlook systems.",
//             "d": "Propose a middleware system that can support interface between systems with Salesforce."
//         },
//         "correctAnswer": "b",
//         "explanation": "Before proposing any specific tool or pattern, the first and most critical step is to perform a thorough analysis. The consultant must understand the business needs, data flows, volume, frequency, and security requirements to properly identify and design the necessary integrations.",
//         "multiSelect": false
//     },
//     {
//         "question": "An Architect is required to integrate with an External Data Source via a Named Credential with an Apex callout due to technical constraints. How is authentication achieved?",
//         "answers": {
//             "a": "Handle authentication with login flows.",
//             "b": "Handle authentication in the code.",
//             "c": "Connect via Salesforce Connect.",
//             "d": "Connect via Communities."
//         },
//         "correctAnswer": "b",
//         "explanation": "When using a Named Credential with an Apex callout, the Apex code itself handles the invocation. The Named Credential stores the endpoint URL and authentication parameters, but the HttpRequest class in Apex is used to construct and send the request, effectively handling the authentication process as defined in the Named Credential.",
//         "multiSelect": false
//     },
//     {
//         "question": "What are two key considerations an Integration Architect should make prior to the implementation of Shield Platform Encryption?",
//         "answers": {
//             "a": "Encrypt the data using the most current key.",
//             "b": "Review shield platform encryption configurations.",
//             "c": "Encrypt all the data so that it is secure.",
//             "d": "Use Shield Platform Encryption as a user authentication or authorization tool."
//         },
//         "correctAnswer": [
//             "b",
//             "c"
//         ],
//         "explanation": "Before implementation, it's crucial to review all configurations, such as key management and encryption policies, to ensure they align with business requirements (B). Additionally, the goal is to encrypt all sensitive data that falls under the policy to ensure it is secure at rest, not just new data (C). Shield Platform Encryption is not an authentication tool.",
//         "multiSelect": true
//     },
//     {
//         "question": "Universal Containers (UC) would like to expose data from on-premise applications, which are behind a corporate network, to Salesforce for a unified user experience. The data must be accessible from Salesforce in real-time. Which two actions should be recommended to fulfill this system requirement?",
//         "answers": {
//             "a": "Develop an application in Heroku that connects to the on-premisedatabase via an ODBC string and VPC connection.",
//             "b": "Develop custom APIs on the company's network that are invokable by Salesforce.",
//             "c": "Deploy MuleSoft to the on-premise network and design externally facing APIs to expose the data.",
//             "d": "Run a batch job with an ETL tool from an on-premise server to move data to Salesforce."
//         },
//         "correctAnswer": [
//             "b",
//             "c"
//         ],
//         "explanation": "Both options provide a way to expose on-premise data via real-time APIs. Developing custom APIs (B) is a direct approach. Using an integration platform like MuleSoft (C) can also achieve this, often with added benefits like security, orchestration, and transformation capabilities. Batch jobs (D) are not real-time.",
//         "multiSelect": true
//     },
//     {
//         "question": "A call center needs to view historical case data which is archived in a separate, performant data store (20M+ records). When reviewing a case in Salesforce, agents need to see the related historical items. Which mechanism and pattern are recommended to maximize declarative configuration?",
//         "answers": {
//             "a": "Use ESB tool with Data Virtualization pattern, expose OData endpoint, and then use Salesforce Connect to consume and display the External Object alongside with the Case object.",
//             "b": "Use an ESB tool with a fire and forget pattern and then publish a platform event for the requested historical data.",
//             "c": "Use an ESB tool with Request-Reply pattern and then make a real-time Apex callout to the ESB endpoint to fetch and display component related to Case object",
//             "d": "Use an ETL tool with a Batch Data Synchronization pattern to migrate historical data into Salesforce and into a custom object (historical data) related to Case object."
//         },
//         "correctAnswer": "a",
//         "explanation": "This scenario is a perfect fit for data virtualization. Salesforce Connect allows you to access data from external systems in real-time without storing it in Salesforce. By having the middleware (ESB) expose the historical data via an OData endpoint, Salesforce Connect can declaratively create an External Object that can be displayed on the Case page layout, avoiding code and data replication.",
//         "multiSelect": false
//     },
//     {
//         "question": "An Architect is asked to build a solution that allows a service to access Salesforce through the API. What is the first thing the Architect should do?",
//         "answers": {
//             "a": "Create a new user with System Administrator profile.",
//             "b": "Authenticate the integration using existing Single Sign-On.",
//             "c": "Authenticate the integration using existing Network-Based Security.",
//             "d": "Create a special user solely for the integration purposes."
//         },
//         "correctAnswer": "d",
//         "explanation": "The best practice for security, accountability, and traceability is to create a dedicated integration user for each integration. This user should be configured with a profile that grants only the minimum necessary permissions for the integration to function (principle of least privilege).",
//         "multiSelect": false
//     },
//     {
//         "question": "Universal Containers (UC) uses Salesforce as the system of record for customers. Customer data also exists in an ERP, ticketing system, and data lake, each with its own unique identifier. UC plans to use middleware and needs to update the proper external system when a Salesforce record changes, and vice versa. Which two solutions should an Integration Architect recommend?",
//         "answers": {
//             "a": "Locally cache external ID'S at the middleware layer and design business logic to map updates between systems.",
//             "b": "Store unique identifiers in an External ID field in Salesforce and use this to update the proper records across systems.",
//             "c": "Use Change Data Capture to update downstream systems accordingly when a record changes.",
//             "d": "Design an MDM solution that maps external ID's to the Salesforce record ID."
//         },
//         "correctAnswer": [
//             "c",
//             "d"
//         ],
//         "explanation": "Change Data Capture (CDC) is a scalable way to publish record changes from Salesforce in near real-time, which the middleware can subscribe to for updating downstream systems (C). For a robust, long-term solution that manages identities across multiple systems, a Master Data Management (MDM) solution is the best practice. MDM creates a central hub to map all identifiers to a master record, ensuring data quality and consistency (D).",
//         "multiSelect": true
//     },
//     {
//         "question": "A company needs to send data from Salesforce to a homegrown system behind a corporate firewall. The data needs to be pushed one way, not in real time, with an average volume of 2 million records per day. What should an integration architect consider when choosing the right option?",
//         "answers": {
//             "a": "Due to high volume of records, number of concurrent requests can hit the limit for the REST API call to external system.",
//             "b": "Due to high volume of records, a third-party integration tool is required to stage records off platform.",
//             "c": "Due to high volume of records, the external system will need to use a BULK API Rest endpoint to connect to salesforce.",
//             "d": "Due to high volume of records, salesforce will need to make a REST API call to external system."
//         },
//         "correctAnswer": "b",
//         "explanation": "Pushing 2 million records per day directly from Salesforce via Apex callouts would quickly exhaust daily API and governor limits. A third-party integration (ETL) tool is designed for such high-volume data movement. It can extract the data from Salesforce efficiently (e.g., using the Bulk API), stage it, and then handle the process of loading it into the on-premise system, managing performance and reliability off-platform.",
//         "multiSelect": false
//     },
//     {
//         "question": "Northern Trail Outfitters (NTO) has recently implemented middleware. The ERP system requires transactions to be captured in near real time at a REST endpoint, initiated when an order is created in Salesforce. The Salesforce team has limited development resources and requires a low-code solution. Which two options will fulfill the use case requirements?",
//         "answers": {
//             "a": "Use Remote Process Invocation fire and forget pattern on insert on the order object using Flow Builder.",
//             "b": "Implement a Workflow Rule with Outbound Messaging to send SOAP messages to the designated endpoint.",
//             "c": "Implement Change Data Capture on the order object and leverage the replay Id in the middleware solution.",
//             "d": "Use a process builder to create a Platform Event, selecting the record type as the Platform Event Name on insert of record."
//         },
//         "correctAnswer": [
//             "a",
//             "c"
//         ],
//         "explanation": "Flow Builder allows for a low-code implementation of a 'fire-and-forget' callout to the REST endpoint (A). Alternatively, Change Data Capture (CDC) is a scalable, near real-time, event-based solution. The middleware can subscribe to the order change events and process them reliably using the replay ID (C). Outbound Messaging (B) is SOAP-based, not REST.",
//         "multiSelect": true
//     },
//     {
//         "question": "A company's single page application consolidates data through synchronous and asynchronous calls. To measure performance, every call's start and finish time is logged (A to H in a diagram showing the flow). Which computation represents the end-to-end response time from the user's perspective?",
//         "answers": {
//             "a": "Sum of A to H",
//             "b": "Sum of A to F",
//             "c": "Sum of A, G, and H",
//             "d": "Sum of A and H"
//         },
//         "correctAnswer": "d",
//         "explanation": "From the user's perspective, the response time is the duration from when they initiate an action until they see the final result on their screen. This corresponds to the initial synchronous call from the UI to the application (A) and the final synchronous call from the application back to the UI (H). The intermediate asynchronous calls (B to G) happen in the background and do not block the user interface, so they are not part of the perceived response time.",
//         "multiSelect": false
//     },
//     {
//         "question": "A Lightning Web Component (LWC) displays transactions from a custom object in Salesforce. This object is updated periodically and may not have all the necessary transactions at any given time. A middleware service provides RESTful APIs that can retrieve all transactions from the source systems. What should the Integration Architect specify so the LWC can display all required transactions?",
//         "answers": {
//             "a": "Call the Enterprise APIs directly from the LWC's JavaScript code and redisplay the LWC on receipt of the API response.",
//             "b": "Let the Lightning Data Service with an wire adapter display new values when the custom object records change.",
//             "c": "Use the Continuation class to call the Enterprise APIs and then process the response in a callback method.",
//             "d": "Publish a Platform Event, have the middleware subscribe and update the custom object on receipt of Platform Event."
//         },
//         "correctAnswer": "a",
//         "explanation": "To get the most up-to-date and complete data, the LWC should make a direct call to the middleware's REST API. This is done from the LWC's JavaScript controller using the Fetch API. Upon receiving the response, the JavaScript can then process the data and re-render the component to display the complete list of transactions to the user. This provides a real-time view without waiting for the periodic replication to Salesforce.",
//         "multiSelect": false
//     },
//     {
//         "question": "A data migration team is decommissioning a legacy CRM and migrating data to Salesforce. They asked for a recommendation to optimize the performance of the data load. Which approach should be used to meet the requirement?",
//         "answers": {
//             "a": "Use Bulk API to process jobs in parallel mode.",
//             "b": "Contact Salesforce support to schedule performance load.",
//             "c": "Use Bulk API to process jobs in serial mode.",
//             "d": "Use Bulk API to process jobs in high performance mode."
//         },
//         "correctAnswer": "a",
//         "explanation": "The Bulk API is designed for loading large data sets. To maximize performance, jobs should be processed in parallel mode. This allows Salesforce to process multiple batches from the job simultaneously, significantly speeding up the overall data load time compared to serial mode, which processes one batch at a time.",
//         "multiSelect": false
//     },
//     {
//         "question": "An architect needs to integrate three separate external systems with Salesforce and wants to ensure proper security, auditing, and monitoring for each. What is the best practice to achieve this?",
//         "answers": {
//             "a": "A shared integration user for the three external system integrations.",
//             "b": "A shared Connected App for the three external system integrations.",
//             "c": "A unique integration user for each external system integration.",
//             "d": "A Connected App for each external system integration."
//         },
//         "correctAnswer": "d",
//         "explanation": "Using a separate Connected App for each external system provides the most granular control and visibility. Each Connected App can have its own OAuth policies (IP restrictions, refresh token policies), and API usage is tracked separately, which simplifies monitoring, auditing, and troubleshooting for each specific integration.",
//         "multiSelect": false
//     },
//     {
//         "question": "Northern Trail Outfitters needs to make synchronous callouts to 'available to promise' services to query product availability and reserve inventory during customer checkout. Which two considerations should an integration architect make when building a scalable integration solution?",
//         "answers": {
//             "a": "The typical and worst-case historical response times.",
//             "b": "The number batch jobs that can run concurrently.",
//             "c": "How many concurrent service calls are being placed.",
//             "d": "The maximum query cursors open per user on the service."
//         },
//         "correctAnswer": [
//             "a",
//             "c"
//         ],
//         "explanation": "For a synchronous callout during a user process like checkout, performance is critical. The architect must know the response times of the external service to set appropriate timeouts and manage user experience (A). They must also understand the volume of concurrent calls to ensure the solution can handle peak load without hitting Salesforce or external system limits (C).",
//         "multiSelect": true
//     },
//     {
//         "question": "An integration uses Platform Events to send leads to a third-party AI system, which returns a prediction score. A trigger on the Platform Event that receives the score back is failing in Production. What type of monitoring should the Integration Consultant have considered?",
//         "answers": {
//             "a": "Monitor Platform Events created per hour limits across the Salesforce instance.",
//             "b": "Set up debug logs for Platform Event triggers to monitor performance.",
//             "c": "Validate the Platform Event definition matches leads definition.",
//             "d": "Monitor the volume of leads that are created in Salesforce."
//         },
//         "correctAnswer": "a",
//         "explanation": "Platform Events have publishing and delivery limits that are enforced on an hourly basis. A common reason for failures in a high-volume production environment is exceeding these allocation limits. Proactive monitoring of the 'HourlyPublishedPlatformEvents' limit would have helped anticipate this issue.",
//         "multiSelect": false
//     },
//     {
//         "question": "A mobile application for Salesforce users needs a new feature to obtain the device's GPS coordinates and store them on a custom geolocation field. The field is secured with Field Level Security (FLS) so users can only view it, not edit it. The app is already secured with OAuth. What should be done to meet the requirement?",
//         "answers": {
//             "a": "The mobile device makes a SOAP API inbound call. The mobile device receives a REST Apex callout call.",
//             "b": "The mobile device makes a REST API inbound call.",
//             "c": "The mobile device makes a REST Apex inbound call."
//         },
//         "correctAnswer": "c",
//         "explanation": "Since FLS prevents the user from directly editing the field, a standard REST API update call would fail. The solution is to create a custom Apex REST Service. The mobile app makes an inbound call to this service. The Apex class then runs in system context (without sharing), which allows it to bypass the FLS and update the field with the provided GPS coordinates.",
//         "multiSelect": false
//     },
//     {
//         "question": "A large enterprise in a regulated industry is integrating Salesforce with multiple critical back-office systems. Reliability and monitoring of these integrations are required. Which integration solution should the architect consider?",
//         "answers": {
//             "a": "Architect Services in back-office systems to support callouts from Salesforce and build reliability, monitoring and reporting capabilities.",
//             "b": "Decouple back-office system callouts into separate distinct services that have inbuilt error logging and monitoring frameworks.",
//             "c": "Build a custom integration gateway to support back-office system integrations and ensure reliability and monitoring capabilities.",
//             "d": "Leverage Middleware for all back-office system integrations ensuring real time alerting, monitoring and reporting capabilities."
//         },
//         "correctAnswer": "d",
//         "explanation": "For a complex landscape with critical integrations requiring high reliability and monitoring, a dedicated middleware platform is the best practice. Middleware provides a centralized layer for handling data transformation, routing, security, and, crucially, robust error handling, logging, monitoring, and alerting capabilities out of the box.",
//         "multiSelect": false
//     },
//     {
//         "question": "A company is rolling out Salesforce to all Sales and Service staff. Senior Management has requested that monitoring be in place for Operations to be notified of any degradation in Salesforce performance. How should an integration consultant implement monitoring?",
//         "answers": {
//             "a": "Use Salesforce limits API to capture current API usage and configure alerts for monitoring.",
//             "b": "Use APIEVENT to track all user-initiated API calls through SOAP, REST or BULK APIs.",
//             "c": "Identify critical business processes and establish automation to monitor performance against established benchmarks.",
//             "d": "Request Salesforce to monitor the Salesforce instance and notify when there is degradation in performance."
//         },
//         "correctAnswer": "c",
//         "explanation": "Effective performance monitoring isn't just about technical limits; it's about business impact. The best approach is to identify the most critical business processes (e.g., 'Create a Quote', 'Save a Case'), establish performance benchmarks for them, and then use automation (e.g., synthetic monitoring tools) to continuously test these processes and alert when performance degrades.",
//         "multiSelect": false
//     },
//     {
//         "question": "A large enterprise is implementing Sales Cloud. Business requirements include accessing current inventory, generating quotes with pricing from the ERP, accessing invoices, and using an external BI tool for dashboards. The MDM is the system of record for customers. Which systems must be integrated with Salesforce?",
//         "answers": {
//             "a": "ERP, MDM, BI tool and Data Warehouse",
//             "b": "ERP, Inventory, Pricing Engine, Invoices system",
//             "c": "ERP, MDM, Data Warehouse, Invoices system",
//             "d": "ERP, Invoices system, Data Warehouse and BI Tool"
//         },
//         "correctAnswer": "a",
//         "explanation": "Based on the requirements: 1) Pricing and Invoices are in the ERP. 2) Customer data comes from the MDM. 3) Dashboards are in the BI tool, which needs sales data from Salesforce. 4) Inventory data might be in the ERP or a separate system, but ERP is the common source. A Data Warehouse is often used to feed the BI tool. Therefore, integrating with ERP, MDM, and providing data to the BI tool (often via a Data Warehouse) are the key integration points.",
//         "multiSelect": false
//     },
//     {
//         "question": "An integration requires all Apex REST API clients to adhere to RAML specifications, which serve as interface contracts. Which two design specifications should the architect include to ensure that Apex unit tests confirm adherence to the RAML specs?",
//         "answers": {
//             "a": "Call the Apex REST API Clients in a test context to get the mock response.",
//             "b": "Require the Apex REST API Clients to implement the HttpCalloutMock.",
//             "c": "Call the HttpCalloutMock implementation from the Apex REST API Clients.",
//             "d": "Implement HttpCalloutMock to return responses per RAML specification."
//         },
//         "correctAnswer": [
//             "a",
//             "d"
//         ],
//         "explanation": "To test a callout, you must use a mock response. The architect should specify that a class implementing the HttpCalloutMock interface be created, and that this class must return mock HTTP responses that strictly follow the RAML specification (D). The unit test for the client class must then invoke the callout method within a test context (Test.startTest()/stopTest()) so that the mock implementation is used instead of making a real callout (A).",
//         "multiSelect": true
//     },
//     {
//         "question": "An architect recommended using Apex code to make callouts to an external system to process an insurance quote. What governor limit should the integration architect consider to make sure this is the right option for the integration?",
//         "answers": {
//             "a": "The maximum callouts in a single Apex transaction.",
//             "b": "The maximum number of parallel Apex callouts in a single continuation.",
//             "c": "The limit on long-running requests (total execution time).",
//             "d": "The limit of pending operations in the same transaction."
//         },
//         "correctAnswer": "a",
//         "explanation": "A key governor limit for Apex callouts is the number of callouts allowed in a single transaction (currently 100). The architect must evaluate if the business process for processing a quote will ever require more than this limit within one execution context. If so, an asynchronous pattern or a different integration approach may be needed.",
//         "multiSelect": false
//     },
//     {
//         "question": "An integration is being set up between a Salesforce org and an external data source using Salesforce Connect. The external data source supports Open Data Protocol (OData). Which three configurations should an Integration Architect recommend to secure requests coming from Salesforce?",
//         "answers": {
//             "a": "Configure Identity Type for OData connection.",
//             "b": "Configure a Certificate for OData connection.",
//             "c": "Configure Special Compatibility for OData connection.",
//             "d": "Configure CSRF Protection for OData connection.",
//             "e": "Configure CSRF Protection on External Data Source."
//         },
//         "correctAnswer": [
//             "a",
//             "b",
//             "d"
//         ],
//         "explanation": "To secure the connection, you must configure the authentication method using the 'Identity Type' setting (e.g., Named Principal, OAuth 2.0) (A). To protect data in transit, you can use a 'Certificate' for SSL/TLS encryption (B). To prevent cross-site request forgery attacks, you should enable the 'CSRF Protection' setting on the External Data Source definition in Salesforce (D).",
//         "multiSelect": true
//     },
//     {
//         "question": "A company needs to check customer communication preferences from an external service in real-time within a Lightning Flow. The external service exposes a REST API with an OpenAPI 2.0 specification. The flow needs Boolean and string values back to make decisions. Which pattern and mechanism is most suitable?",
//         "answers": {
//             "a": "Fire and Forget: Process-driven platform events publishes events on Salesforce Event Bus.",
//             "b": "Remote Call-In: Salesforce REST API with REST Composite Resources.",
//             "c": "Request-Reply: Enhanced External Services invokes a REST API.",
//             "d": "Data Virtualization: Salesforce Connect map data external REST data in external objects."
//         },
//         "correctAnswer": "c",
//         "explanation": "Enhanced External Services is designed for this exact use case. It allows you to declaratively register an external service using its OpenAPI spec and then invoke its methods as actions directly within a Flow. This fits the synchronous Request-Reply pattern needed to get an immediate response for the flow's logic, all without writing Apex code.",
//         "multiSelect": false
//     },
//     {
//         "question": "Which three considerations should an Integration Architect consider when recommending Platform Event as an Integration solution?",
//         "answers": {
//             "a": "Inability to query event messages using SOQL",
//             "b": "Subscribe to an AssetToken Event stream to monitor OAuth2.0 authentication activity.",
//             "c": "Inability to create a Lightning record page for platform events.",
//             "d": "When you delete an event definition, it's permanently removed and can't be restored.",
//             "e": "You can use Event Monitoring to track user activity, such as logins and running reports."
//         },
//         "correctAnswer": [
//             "a",
//             "c",
//             "d"
//         ],
//         "explanation": "When proposing Platform Events, an architect must highlight their characteristics and limitations. Key considerations include: event messages are not stored in standard objects and thus cannot be queried via SOQL (A); they are not data objects and do not have record pages (C); and deleting an event's definition is a permanent, irreversible metadata change (D).",
//         "multiSelect": true
//     },
//     {
//         "question": "An integration solution uses the REST API to update Account, Contact, and other related information. Data volumes have increased, and daily API call limits are being exceeded. The customer wants to decrease the number of API calls using bulk updates but prefers to continue using the REST API. Which REST API composite resource should the architect use to allow up to 200 records in one API call?",
//         "answers": {
//             "a": "SObject Collections",
//             "b": "SObject Tree",
//             "c": "Batch",
//             "d": "Composite"
//         },
//         "correctAnswer": "a",
//         "explanation": "The SObject Collections resource is specifically designed for creating, updating, or deleting a collection of records of the same SObject type in a single request. It supports up to 200 records per call, making it ideal for bulk operations on unrelated records and reducing API call consumption.",
//         "multiSelect": false
//     },
//     {
//         "question": "A company accepts payment requests 24x7. Their SLA requires every request to be processed by their Payment System. They are encountering intermittent update errors when multiple processes try to update the same Payment Request record simultaneously. Which two recommendations should an integration architect make to improve SLA and handle update conflicts?",
//         "answers": {
//             "a": "Middleware should coordinate request delivery and payment processing.",
//             "b": "Data Entry Point and Middleware should automatically retry requests.",
//             "c": "Payment System should process a payment request only once.",
//             "d": "Payment System and Middleware should automatically retry requests."
//         },
//         "correctAnswer": [
//             "a",
//             "c"
//         ],
//         "explanation": "Using middleware to mediate and coordinate the flow of requests ensures reliable, ordered delivery and can manage retries centrally, preventing a chaotic free-for-all (A). To prevent duplicate processing and handle race conditions, the Payment System itself must be idempotent—it should use the globally unique identifier to ensure that it processes any given payment request exactly once, regardless of how many times it receives the request (C).",
//         "multiSelect": true
//     },
//     {
//         "question": "A customer imports data into Salesforce using the Bulk API in parallel mode with a batch size of 2000. Batches frequently fail with the error 'Max CPU time exceeded'. A smaller batch size will fix this error. Which two options should be considered as potential side effects of using a smaller batch size?",
//         "answers": {
//             "a": "Smaller batch size may cause record-locking errors.",
//             "b": "Smaller batch size may increase time required to execute bulk jobs.",
//             "c": "Smaller batch size may exceed the concurrent API request limits.",
//             "d": "Smaller batch size can trigger 'Too many concurrent batches' error."
//         },
//         "correctAnswer": [
//             "a",
//             "b"
//         ],
//         "explanation": "Reducing the batch size means more batches will be created for the same amount of data. This increases the overall processing overhead and can extend the total job execution time (B). Additionally, having more, smaller batches running in parallel increases the likelihood of two batches attempting to lock the same parent record or related records, leading to record-locking errors (A).",
//         "multiSelect": true
//     },
//     {
//         "question": "Northern Trail Outfitters (NTO) uses a custom mobile app with Salesforce Chatter Feeds. NTO wants to automatically post a Chatter item to Twitter whenever the post includes the #thanksNTO hashtag. Which API should an Integration Architect use to meet this requirement?",
//         "answers": {
//             "a": "Connect REST API",
//             "b": "REST API",
//             "c": "Streaming API",
//             "d": "Apex REST"
//         },
//         "correctAnswer": "a",
//         "explanation": "The Connect REST API is specifically designed for accessing Chatter feeds and social data like users, groups, and files. It is the most direct and feature-rich API for interacting with Chatter content, making it the ideal choice for a process that needs to read Chatter posts.",
//         "multiSelect": false
//     },
//     {
//         "question": "A B2C company is expanding to Latin America and must be able to completely delete a customer's personal data on demand, in compliance with anticipated privacy regulations. Data is stored in legacy mainframes, Salesforce Clouds (Commerce, Service, etc.), and other systems. Which three requirements should the integration architect prioritize?",
//         "answers": {
//             "a": "Manual steps and procedures that may be necessary.",
//             "b": "Impact of deleted records on system functionality.",
//             "c": "Ability to delete personal data in every system.",
//             "d": "Feasibility to restore deleted records when needed.",
//             "e": "Ability to provide a 360-degree view of the customer."
//         },
//         "correctAnswer": [
//             "a",
//             "b",
//             "c"
//         ],
//         "explanation": "First, the solution must technically be able to delete data in every single system where it resides (C). The architect must analyze the downstream impact of these deletions on system functionality, such as reporting or related records (B). Given the complexity and legacy systems involved, it's also critical to identify and document any necessary manual steps or procedures that cannot be automated to ensure the process can be completed successfully (A).",
//         "multiSelect": true
//     },
//     {
//         "question": "A company wants to standardize exception tracking. The plan is to build a company-wide logging service on middleware, create Salesforce Case records for exceptions based on certain thresholds, and change all Apex Loggers to publish exceptions as custom Platform Events. Which two specifications should the architect include in the logging service architecture?",
//         "answers": {
//             "a": "Receive Application Events through Change Data Capture (CDC).",
//             "b": "Create Salesforce Cases using the Salesforce REST, SOAP or Bulk API.",
//             "c": "Create Salesforce Cases conditionally using automatic Case creation rules.",
//             "d": "Subscribe to the Application Exceptions using the Salesforce Streaming API."
//         },
//         "correctAnswer": [
//             "b",
//             "d"
//         ],
//         "explanation": "The logging service, which is external to Salesforce, needs to listen for the Application Exception Platform Events. It can do this by subscribing to the event channel using the Streaming API (CometD) (D). Once the service receives an event and determines a Case is needed, it will act as an API client and use a standard inbound API (like REST or SOAP) to create the Case record in Salesforce (B).",
//         "multiSelect": true
//     },
//     {
//         "question": "Customer Support agents need seamless access to customer billing information from an Enterprise Billing System (EBS) and view generated bills from a Document Management System (DMS). Only authorized users are allowed access to these systems. Which three authorization and authentication needs should an integration consultant consider?",
//         "answers": {
//             "a": "Users should be authorized to view information specific to the customer they are servicing without a need to search for customer.",
//             "b": "Identify options to maintain DMS and EBS authentication and authorization details in Salesforce.",
//             "c": "Consider Enterprise security needs for access to DMS and EBS.",
//             "d": "Consider options to migrate DMS and EBS into Salesforce.",
//             "e": "Users should be authenticated into DMS and EBS without having to enter username and password."
//         },
//         "correctAnswer": [
//             "a",
//             "c",
//             "e"
//         ],
//         "explanation": "The solution must be seamless, so users should not have to log in again, indicating a need for Single Sign-On (SSO) (E). The access should be contextual, automatically showing billing info for the customer record being viewed in Salesforce (A). Finally, the entire solution must comply with the broader enterprise security policies for accessing these critical systems (C).",
//         "multiSelect": true
//     },
//     {
//         "question": "What is the first thing an Integration Architect should validate if a callout from a Lightning Web Component to an external endpoint is failing?",
//         "answers": {
//             "a": "The endpoint domain has been added to Cross-Origin Resource Sharing.",
//             "b": "The endpoint URL has been added to Content Security Policies.",
//             "c": "The endpoint URL has added been to an outbound firewall rule.",
//             "d": "The endpoint URL has been added to Remote Site Settings."
//         },
//         "correctAnswer": "a",
//         "explanation": "Callouts made directly from a browser-side component like an LWC are subject to the browser's same-origin policy. For the callout to a different domain to succeed, that domain must be registered in Salesforce's Cross-Origin Resource Sharing (CORS) allowlist. A missing CORS entry is the most common reason for these callouts to be blocked by the browser.",
//         "multiSelect": false
//     },
//     {
//         "question": "When an order is marked as 'Fulfilled' in Salesforce, all order and line item data must be sent to an existing finance application's web service for invoicing. The business requires a guarantee that each fulfilled order reaches the finance application exactly once. Which integration approach meets these requirements?",
//         "answers": {
//             "a": "Trigger invokes Queueable Apex method, with custom error handling process.",
//             "b": "Trigger makes @future Apex method, with custom error handling process.",
//             "c": "Button press invokes synchronous callout, with user handling retries in case of error",
//             "d": "Outbound Messaging, which will automatically handle error retries to the service."
//         },
//         "correctAnswer": "a",
//         "explanation": "Queueable Apex is superior to @future for this use case because it allows for more complex logic, chaining jobs, and better error handling. By invoking a Queueable job from a trigger, the process is asynchronous. Within the Queueable class, the developer can implement custom error handling and retry logic, and by implementing the Database.Stateful interface, can track the job's state to ensure the 'exactly once' delivery requirement is met.",
//         "multiSelect": false
//     },
//     {
//         "question": "A customer is evaluating Platform Events and Outbound Messages for a near-real time integration with 3,000 consumers. Which three considerations should be evaluated when deciding between the solutions?",
//         "answers": {
//             "a": "Both Platform Events and Outbound Message offer declarative means for asynchronous near-real time needs. They aren't best suited for real-time integrations.",
//             "b": "In both Platform Events and Outbound Messages, the event messages are retried by and delivered in sequence, and only once. Salesforce ensures there is no duplicate message delivery.",
//             "c": "Message sequence is possible in Outbound Message but not guaranteed with Platform Events. Both offer very high reliability. Fault handling and recovery are fully handled by Salesforce.",
//             "d": "Number of concurrent subscribers to Platform Events is capped at 2,000. An Outbound Message configuration can pass only 100 notifications in a single message to a SOAP end point.",
//             "e": "Both Platform Events and Outbound Message are highly scalable. However, unlike Outbound Message, only Platform Events have Event Delivery and Event Publishing limits to be considered."
//         },
//         "correctAnswer": [
//             "a",
//             "c",
//             "e"
//         ],
//         "explanation": "Both are asynchronous, near-real-time solutions that can be configured declaratively (A). A key difference is that Outbound Message guarantees in-order delivery, while Platform Events do not (C). Finally, it's crucial to know that Platform Events are subject to specific publishing and delivery limits based on the org's license, whereas Outbound Messages have different types of limits (E). The number of subscribers (3,000) is also a critical factor, as standard Platform Events have a concurrent subscriber limit of 2,000 (mentioned in option D, though D is not a correct comparison overall).",
//         "multiSelect": true
//     }
// ];

export { quizData };