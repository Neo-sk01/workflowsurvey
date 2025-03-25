export const surveyData = [
  {
    id: 1,
    title: "Section 1: Current Tools & Daily Tasks",
    description:
      "Let's understand your daily tasks and the software tools you currently use in your workflows.",
    questions: [
      {
        id: "websiteUrl",
        text: "Please enter your company website URL",
        hint: "Providing your website will help us tailor the assessment to your specific industry and company profile.",
        type: "url",
        placeholder: "https://www.yourcompany.com",
        validation: {
          required: false,
          pattern: "url"
        }
      },
      {
        id: "dailyTasks",
        text: "What are the most time-consuming tasks in your typical workday?",
        hint: "For example: email management, data entry, creating reports, appointment scheduling, invoice processing, etc.",
        type: "radio",
        options: [
          {
            value: "administrative",
            label: "Administrative tasks",
            description: "Email handling, calendar management, document filing, etc.",
          },
          {
            value: "data-entry",
            label: "Data entry & processing",
            description: "Manual input of data into spreadsheets, databases, or other systems",
          },
          {
            value: "document-creation",
            label: "Document creation & management",
            description: "Creating, editing, and organizing documents, reports, and presentations",
          },
          {
            value: "customer-service",
            label: "Customer service & support",
            description: "Responding to inquiries, troubleshooting issues, processing returns",
          },
          {
            value: "other",
            label: "Other routine tasks",
            description: "Inventory management, order processing, etc.",
          },
        ],
      },
      {
        id: "softwareTools",
        text: "Which software applications do you currently use most frequently in your workflow?",
        hint: "Select the tools that your team uses regularly in daily operations.",
        type: "radio",
        options: [
          {
            value: "productivity",
            label: "Office/Productivity Suites",
            description: "Microsoft Office (Word, Excel, PowerPoint), Google Workspace, etc.",
          },
          {
            value: "crm",
            label: "CRM Systems",
            description: "Salesforce, HubSpot, Zoho CRM, Pipedrive, etc.",
          },
          {
            value: "accounting",
            label: "Accounting/Bookkeeping",
            description: "QuickBooks, Xero, FreshBooks, Sage, etc.",
          },
          {
            value: "project-management",
            label: "Project Management",
            description: "Asana, Trello, Monday.com, ClickUp, Jira, etc.",
          },
          {
            value: "ecommerce",
            label: "E-commerce/POS",
            description: "Shopify, WooCommerce, Square, Stripe, etc.",
          },
        ],
      },
      {
        id: "communicationApps",
        text: "What communication tools does your team use for internal and external communication?",
        hint: "Think about the apps you use to stay in touch with team members and clients.",
        type: "radio",
        options: [
          {
            value: "email",
            label: "Email platforms",
            description: "Gmail, Outlook, etc.",
          },
          {
            value: "messaging",
            label: "Messaging apps",
            description: "Slack, Microsoft Teams, Discord, etc.",
          },
          {
            value: "video",
            label: "Video conferencing",
            description: "Zoom, Google Meet, Microsoft Teams, etc.",
          },
          {
            value: "customer-comms",
            label: "Customer communication",
            description: "Intercom, Zendesk, LiveChat, etc.",
          },
          {
            value: "mixed",
            label: "Mixed communication channels",
            description: "A combination of different tools for different purposes",
          },
        ],
      },
      {
        id: "dataTransferProcess",
        text: "How do you currently transfer data between your different software systems?",
        hint: "Consider how information moves from one system to another in your workflow.",
        type: "radio",
        options: [
          {
            value: "manual-entry",
            label: "Manual re-entry",
            description: "We copy and paste data from one system to another",
          },
          {
            value: "import-export",
            label: "Manual import/export",
            description: "We export files from one system and import to another",
          },
          {
            value: "some-integrations",
            label: "Some automated integrations",
            description: "We have some systems connected, but still do manual transfers",
          },
          {
            value: "fully-integrated",
            label: "Fully integrated systems",
            description: "Most of our systems automatically share data",
          },
          {
            value: "api-zapier",
            label: "Using integration tools",
            description: "We use Zapier, Make, or similar tools to connect systems",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Section 2: Repetitive Tasks & Daily Operations",
    description:
      "Let's identify the manual, time-consuming tasks in your business that could benefit from automation.",
    questions: [
      {
        id: "repetitiveTasks",
        text: "Do you have routine tasks that take up valuable time?",
        hint: "For example, manual data entry, repetitive email follow-ups, or routine report generation.",
        type: "checkbox",
        validation: {
          required: true
        }
      },
      {
        id: "employeeTasks",
        text: "Are your employees often tied up with tasks that could be automated?",
        hint: "Think of processes that need to be done the same way every day, like processing invoices or scheduling appointments.",
        type: "checkbox",
        validation: {
          required: true
        }
      },
      {
        id: "manualErrors",
        text: "Do you frequently experience errors due to manual handling of data?",
        hint: "For instance, mistakes in data entry or miscommunication when transferring information between systems.",
        type: "checkbox",
        validation: {
          required: true
        }
      },
    ],
  },
  {
    id: 3,
    title: "Section 3: Systems Integration & Data Management",
    description:
      "Let's explore how your business systems work together and how data flows between them.",
    questions: [
      {
        id: "multipleSystems",
        text: "Do you use multiple software tools that don't easily share information?",
        hint: "This might be causing delays or data mismatches between departments.",
        type: "checkbox",
        validation: {
          required: true
        }
      },
      {
        id: "manualTransfer",
        text: "Are you manually updating or transferring data between systems?",
        hint: "For example, copying customer details from one platform to another.",
        options: [
          {
            value: "frequently",
            label: "Yes, frequently",
            description: "Manual data transfer is common for us",
          },
          {
            value: "occasionally",
            label: "Occasionally",
            description: "We do some manual transfers but not for everything",
          },
          {
            value: "rarely",
            label: "Rarely or never",
            description: "Most of our data transfers are automated",
          },
        ],
      },
      {
        id: "realTimeUpdates",
        text: "Would you benefit from real-time updates and automated notifications about task progress?",
        hint: "Imagine receiving an immediate alert when a customer inquiry is answered or when an order is processed.",
        options: [
          {
            value: "definitely",
            label: "Definitely",
            description: "Real-time updates would be very valuable",
          },
          {
            value: "somewhat",
            label: "Somewhat",
            description: "Could be helpful in some areas",
          },
          {
            value: "not-needed",
            label: "Not really needed",
            description: "Our current notification system is sufficient",
          },
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Section 4: Business Growth & Scalability",
    description:
      "Let's examine how your current processes support or hinder your business growth.",
    questions: [
      {
        id: "businessGrowth",
        text: "Is your business growing, leading to challenges like onboarding new employees or managing higher volumes of orders?",
        hint: "Growing pains that make it hard to keep processes efficient and error-free.",
        options: [
          {
            value: "rapid-growth",
            label: "Yes, we're experiencing rapid growth",
            description: "Our current processes are struggling to keep up",
          },
          {
            value: "steady-growth",
            label: "We have steady, manageable growth",
            description: "Some growing pains but generally manageable",
          },
          {
            value: "stable",
            label: "We're stable or growth is not an issue",
            description: "Our processes scale well with our business needs",
          },
        ],
      },
      {
        id: "scaleOperations",
        text: "Are you finding it difficult to scale operations due to the limitations of manual processes?",
        hint: "For instance, a small team struggling to manage increased workloads during busy periods.",
        options: [
          {
            value: "significant-challenge",
            label: "Yes, it's a significant challenge",
            description: "Manual processes are limiting our growth potential",
          },
          {
            value: "sometimes",
            label: "Sometimes during peak periods",
            description:
              "We manage most of the time but struggle during busy periods",
          },
          {
            value: "no-issue",
            label: "No, scaling is not an issue",
            description: "Our processes handle increased volume well",
          },
        ],
      },
      {
        id: "strategicActivities",
        text: "Would automating some of your processes free up your team to focus on more strategic activities?",
        hint: "Such as improving customer service, innovating new products, or expanding marketing efforts.",
        options: [
          {
            value: "definitely",
            label: "Definitely",
            description:
              "Our team could be much more strategic with less routine work",
          },
          {
            value: "somewhat",
            label: "Somewhat",
            description: "Some team members could benefit from this",
          },
          {
            value: "not-really",
            label: "Not really",
            description:
              "Our team already has a good balance of strategic and routine work",
          },
        ],
      },
    ],
  },
  {
    id: 5,
    title: "Section 5: Process Clarity & Digital Readiness",
    description:
      "Let's assess how well-defined your processes are and how ready your organization is for digital transformation.",
    questions: [
      {
        id: "documentedProcesses",
        text: "Do you have documented, clear processes for your routine operations?",
        hint: "Well-defined steps can help determine which parts of your workflow are most ready for automation.",
        options: [
          {
            value: "well-documented",
            label: "Yes, well-documented processes",
            description:
              "We have clear documentation for most of our processes",
          },
          {
            value: "partially",
            label: "Partially documented",
            description:
              "Some processes are documented, others rely on tribal knowledge",
          },
          {
            value: "minimal",
            label: "Minimal or no documentation",
            description: "Most of our processes are not formally documented",
          },
        ],
      },
      {
        id: "technologyInfrastructure",
        text: "Is your existing technology infrastructure capable of integrating with automation solutions?",
        hint: "A basic digital setup that could support new software without major upgrades.",
        options: [
          {
            value: "modern",
            label: "Yes, we have modern infrastructure",
            description:
              "Our systems are cloud-based and integration-ready",
          },
          {
            value: "mixed",
            label: "We have a mix of modern and legacy systems",
            description:
              "Some systems are ready for integration, others would need updates",
          },
          {
            value: "outdated",
            label: "Our infrastructure needs significant updates",
            description:
              "We would need to upgrade before implementing automation",
          },
        ],
      },
      {
        id: "trainingReadiness",
        text: "Are you open to training your team on low-code or no-code automation tools?",
        hint: "Tools designed for non-technical users can help you start automating quickly.",
        options: [
          {
            value: "very-open",
            label: "Very open to training",
            description:
              "We're eager to learn new tools that improve efficiency",
          },
          {
            value: "somewhat-open",
            label: "Somewhat open",
            description:
              "We would train key team members but not everyone",
          },
          {
            value: "hesitant",
            label: "Hesitant or resistant",
            description:
              "Our team might resist learning new technologies",
          },
        ],
      },
    ],
  },
  {
    id: 6,
    title: "Section 6: Strategic Focus & ROI Potential",
    description:
      "Let's explore the potential return on investment and strategic benefits of automation for your business.",
    questions: [
      {
        id: "timeSavings",
        text: "Do you believe that saving time on routine tasks could directly improve your bottom line?",
        hint: "If employees spend less time on repetitive work, they can focus on tasks that drive revenue.",
        options: [
          {
            value: "significant-impact",
            label: "Yes, it would have a significant impact",
            description:
              "Time savings would directly translate to higher productivity and revenue",
          },
          {
            value: "moderate-impact",
            label: "It would have a moderate impact",
            description:
              "Some areas would benefit more than others",
          },
          {
            value: "minimal-impact",
            label: "It would have minimal impact",
            description:
              "Time savings might not significantly affect our bottom line",
          },
        ],
      },
      {
        id: "aiAnalytics",
        text: "Would you be interested in using AI-driven analytics to monitor workflow performance?",
        hint: "Imagine insights that help you pinpoint bottlenecks and optimize resource allocation.",
        options: [
          {
            value: "very-interested",
            label: "Very interested",
            description:
              "We would value data-driven insights to improve operations",
          },
          {
            value: "somewhat-interested",
            label: "Somewhat interested",
            description:
              "We'd consider it for specific areas of our business",
          },
          {
            value: "not-interested",
            label: "Not currently interested",
            description:
              "We're not ready for this level of analytics yet",
          },
        ],
      },
      {
        id: "investmentReadiness",
        text: "Are you ready to invest a modest budget now for long-term savings and increased efficiency?",
        hint: "Even light automation can provide significant ROI through cost and time savings.",
        options: [
          {
            value: "ready-to-invest",
            label: "Yes, ready to invest",
            description:
              "We see automation as a strategic priority worth investing in",
          },
          {
            value: "cautious",
            label: "Cautiously interested",
            description:
              "We'd consider a small pilot project first",
          },
          {
            value: "not-ready",
            label: "Not ready to invest at this time",
            description:
              "Budget constraints or other priorities are preventing investment",
          },
        ],
      },
    ],
  },
];
