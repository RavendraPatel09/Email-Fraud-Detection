import { EmailData, Incident, IOC, ThreatEvent, GeoLocation, LedgerBlock, EvidenceItem } from '../types';

export interface DemoScenario {
  id: string;
  name: string;
  badge: string;
  badgeColor: string;
  description: string;
  email: EmailData;
  geoLocation: GeoLocation;
  iocs: IOC[];
}

export const DEMO_SCENARIOS: DemoScenario[] = [
  {
    id: 'demo-phishing-1',
    name: 'DEMO 01: High-Risk Phishing',
    badge: '91 HIGH RISK',
    badgeColor: 'bg-red-500/10 text-red-400 border-red-500/30',
    description: 'Impersonation of PayPal Security with malicious domain paypa1-security.com and urgent verification lure.',
    email: {
      id: 'EML-2026-9041',
      rawText: `From: security@paypa1-security.com
To: employee@company.com
Subject: URGENT: Your account will be suspended
Date: Sat, 26 Sep 2026 16:32:10 +0530
Reply-To: verify-account@secure-login.xyz
Message-ID: <20260926163210.89124@paypa1-security.com>
Return-Path: <bounce@secure-login.xyz>
Received: from mail.paypa1-security.com (185.220.101.45) by mx.company.com with ESMTP;
Source-IP: 185.220.101.45
User-Agent: Thunderbird 115.0

Dear Valued Customer,

Your PayPal account requires immediate verification due to unusual activity detected from an unauthorized IP location.

Failure to verify your identity within 24 hours will result in permanent account suspension and asset freeze.

Click the secure link below to confirm your credentials:
http://paypa1-security.com/verify-login?session=9841284912

Sincerely,
PayPal Security Team`,
      headers: {
        from: 'security@paypa1-security.com',
        to: 'employee@company.com',
        replyTo: 'verify-account@secure-login.xyz',
        subject: 'URGENT: Your account will be suspended',
        date: 'Sat, 26 Sep 2026 16:32:10 +0530',
        messageId: '<20260926163210.89124@paypa1-security.com>',
        returnPath: '<bounce@secure-login.xyz>',
        received: [
          'from mail.paypa1-security.com (185.220.101.45) by mx.company.com with ESMTP id 98124',
          'from relay.tor-node.exit (185.220.101.45) by mail.paypa1-security.com'
        ],
        sourceIP: '185.220.101.45',
        userAgent: 'Thunderbird 115.0'
      },
      auth: {
        spf: 'FAILED',
        dkim: 'FAILED',
        dmarc: 'FAILED',
        spfDetails: 'IP 185.220.101.45 is not authorized in SPF record for paypa1-security.com',
        dkimDetails: 'RSA signature verification failed. Key selector "s2026" not found in DNS.',
        dmarcDetails: 'Header domain paypa1-security.com does not align with envelope domain secure-login.xyz.'
      },
      bodyText: `Your account requires immediate verification.
Failure to verify within 24 hours will result in suspension.

Verify now: http://paypa1-security.com/verify-login?session=9841284912`,
      urls: [
        'http://paypa1-security.com/verify-login?session=9841284912',
        'http://secure-login.xyz/auth'
      ],
      attachments: [
        {
          name: 'verification_notice.pdf.exe',
          size: '1.4 MB',
          mime: 'application/x-msdownload',
          hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
        }
      ]
    },
    geoLocation: {
      ip: '185.220.101.45',
      country: 'Germany',
      countryCode: 'DE',
      city: 'Frankfurt am Main',
      region: 'Hesse',
      isp: 'Zwiebelfreunde e.V. / Tor Exit Node',
      asn: 'AS208294',
      timezone: 'Europe/Berlin',
      latitude: 50.1109,
      longitude: 8.6821,
      isApproximate: true
    },
    iocs: [
      {
        id: 'ioc-1',
        type: 'IP',
        value: '185.220.101.45',
        reputation: 'MALICIOUS',
        confidence: 94,
        source: 'Global Tor Exit & Botnet Feed',
        lastSeen: '2026-09-26 16:30'
      },
      {
        id: 'ioc-2',
        type: 'DOMAIN',
        value: 'paypa1-security.com',
        reputation: 'MALICIOUS',
        confidence: 96,
        source: 'Typosquatting & Phishing Database',
        lastSeen: '2026-09-26 16:32'
      },
      {
        id: 'ioc-3',
        type: 'URL',
        value: 'http://paypa1-security.com/verify-login?session=9841284912',
        reputation: 'MALICIOUS',
        confidence: 92,
        source: 'OpenPhish Threat Stream',
        lastSeen: '2026-09-26 16:32'
      },
      {
        id: 'ioc-4',
        type: 'EMAIL',
        value: 'verify-account@secure-login.xyz',
        reputation: 'SUSPICIOUS',
        confidence: 88,
        source: 'AICTE Threat Intelligence',
        lastSeen: '2026-09-26 15:45'
      }
    ]
  },
  {
    id: 'demo-suspicious-2',
    name: 'DEMO 02: Suspicious Business Email',
    badge: '68 MEDIUM RISK',
    badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    description: 'Executive invoice wire transfer request with altered bank details from unknown external domain.',
    email: {
      id: 'EML-2026-7732',
      rawText: `From: cfo-office@finance-corp-global.net
To: accounts-payable@company.com
Subject: URGENT Wire Update - Vendor Invoice #98241
Date: Sat, 26 Sep 2026 14:15:00 +0530
Reply-To: wire-confirm@finance-corp-global.net
Message-ID: <202609261415.00192@finance-corp-global.net>
Return-Path: <bounce@finance-corp-global.net>
Source-IP: 198.51.100.82

Please process the attached updated bank routing details for Invoice #98241 immediately.
Our primary bank is currently under audit so redirect payment to our offshore clearing account.

Best regards,
Finance Operations Team`,
      headers: {
        from: 'cfo-office@finance-corp-global.net',
        to: 'accounts-payable@company.com',
        replyTo: 'wire-confirm@finance-corp-global.net',
        subject: 'URGENT Wire Update - Vendor Invoice #98241',
        date: 'Sat, 26 Sep 2026 14:15:00 +0530',
        messageId: '<202609261415.00192@finance-corp-global.net>',
        returnPath: '<bounce@finance-corp-global.net>',
        received: ['from mail.finance-corp-global.net (198.51.100.82) by mx.company.com'],
        sourceIP: '198.51.100.82',
        userAgent: 'Webmail Interface v4.2'
      },
      auth: {
        spf: 'PASSED',
        dkim: 'FAILED',
        dmarc: 'SOFTFAIL',
        spfDetails: 'IP 198.51.100.82 matches SPF record for finance-corp-global.net',
        dkimDetails: 'Signature missing or unverified',
        dmarcDetails: 'DMARC policy set to none; domain alignment mismatch'
      },
      bodyText: `Please process the attached updated bank routing details for Invoice #98241 immediately.
Redirect payment to offshore clearing account.`,
      urls: ['http://finance-corp-global.net/wire-instructions.pdf'],
      attachments: [
        {
          name: 'Updated_Wire_Details.pdf',
          size: '340 KB',
          mime: 'application/pdf',
          hash: '7d891b29a14c9e8812739481231908219018429184012849182418291084'
        }
      ]
    },
    geoLocation: {
      ip: '198.51.100.82',
      country: 'United States',
      countryCode: 'US',
      city: 'Ashburn',
      region: 'Virginia',
      isp: 'Datacenter Hosting Corp',
      asn: 'AS14618',
      timezone: 'America/New_York',
      latitude: 39.0438,
      longitude: -77.4874,
      isApproximate: true
    },
    iocs: [
      {
        id: 'ioc-5',
        type: 'DOMAIN',
        value: 'finance-corp-global.net',
        reputation: 'SUSPICIOUS',
        confidence: 75,
        source: 'Newly Registered Domain Feed (3 days old)',
        lastSeen: '2026-09-26 14:15'
      },
      {
        id: 'ioc-6',
        type: 'IP',
        value: '198.51.100.82',
        reputation: 'SUSPICIOUS',
        confidence: 70,
        source: 'VPS Hosting Provider Range',
        lastSeen: '2026-09-26 14:15'
      }
    ]
  },
  {
    id: 'demo-safe-3',
    name: 'DEMO 03: Safe Legitimate Email',
    badge: '04 SAFE',
    badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    description: 'Legitimate internal system notification with full SPF, DKIM, and DMARC alignment.',
    email: {
      id: 'EML-2026-1029',
      rawText: `From: notifications@github.com
To: dev-team@company.com
Subject: [GitHub] Security Advisory Notification: patch updated
Date: Sat, 26 Sep 2026 11:00:00 +0530
Message-ID: <gh-adv-104921@github.com>
Source-IP: 192.30.252.192

A new security release for your repository is available. Please review release notes.`,
      headers: {
        from: 'notifications@github.com',
        to: 'dev-team@company.com',
        subject: '[GitHub] Security Advisory Notification: patch updated',
        date: 'Sat, 26 Sep 2026 11:00:00 +0530',
        messageId: '<gh-adv-104921@github.com>',
        returnPath: '<bounces@github.com>',
        received: ['from out-21.smtp.github.com (192.30.252.192) by mx.company.com'],
        sourceIP: '192.30.252.192',
        userAgent: 'GitHub Mailer'
      },
      auth: {
        spf: 'PASSED',
        dkim: 'PASSED',
        dmarc: 'PASSED',
        spfDetails: 'IP 192.30.252.192 is authorized by spf.github.com',
        dkimDetails: 'Valid signature from domain github.com (s=pf2023)',
        dmarcDetails: 'Full alignment achieved (p=reject)'
      },
      bodyText: `A new security release for your repository is available. Please review release notes at https://github.com`,
      urls: ['https://github.com/security/advisories'],
      attachments: []
    },
    geoLocation: {
      ip: '192.30.252.192',
      country: 'United States',
      countryCode: 'US',
      city: 'San Francisco',
      region: 'California',
      isp: 'GitHub Inc. / Microsoft Azure',
      asn: 'AS36459',
      timezone: 'America/Los_Angeles',
      latitude: 37.7749,
      longitude: -122.4194,
      isApproximate: true
    },
    iocs: [
      {
        id: 'ioc-7',
        type: 'DOMAIN',
        value: 'github.com',
        reputation: 'CLEAN',
        confidence: 100,
        source: 'Alexa Top 100 Verified',
        lastSeen: '2026-09-26 11:00'
      }
    ]
  }
];

export const INITIAL_INCIDENTS: Incident[] = [
  {
    id: 'INC-2026-1042',
    title: 'PayPal Impersonation Phishing Campaign',
    classification: 'PHISHING',
    severity: 'HIGH',
    status: 'INVESTIGATING',
    sourceIP: '185.220.101.45',
    sourceLocation: 'Frankfurt am Main, Germany',
    sender: 'security@paypa1-security.com',
    recipient: 'employee@company.com',
    createdAt: '2026-09-26 16:32:10',
    updatedAt: '2026-09-26 16:42:18',
    assignedTo: 'SOC Analyst - Cyber Cell',
    notes: [
      'Initial automated triage flagged domain paypa1-security.com as typosquatting lure.',
      'Extracted executable attachment payload (verification_notice.pdf.exe) sent to sandbox analysis.'
    ],
    actionsTaken: ['IP Block Requested', 'Domain Added to Blacklist']
  },
  {
    id: 'INC-2026-1041',
    title: 'Executive Wire Transfer Fraud (BEC)',
    classification: 'EXECUTIVE IMPERSONATION',
    severity: 'MEDIUM',
    status: 'OPEN',
    sourceIP: '198.51.100.82',
    sourceLocation: 'Ashburn, VA, United States',
    sender: 'cfo-office@finance-corp-global.net',
    recipient: 'accounts-payable@company.com',
    createdAt: '2026-09-26 14:15:00',
    updatedAt: '2026-09-26 14:20:10',
    assignedTo: 'Unassigned',
    notes: ['Newly registered domain used for CFO impersonation.'],
    actionsTaken: []
  },
  {
    id: 'INC-2026-1040',
    title: 'Credential Harvesting via Fake Microsoft 365 Portal',
    classification: 'PHISHING',
    severity: 'CRITICAL',
    status: 'QUARANTINED',
    sourceIP: '103.251.167.12',
    sourceLocation: 'Mumbai, India',
    sender: 'admin@m365-login-verify.info',
    recipient: 'all-staff@company.com',
    createdAt: '2026-09-26 12:04:18',
    updatedAt: '2026-09-26 12:30:00',
    assignedTo: 'Lead Forensic Specialist',
    notes: ['Mass email burst targetting 450 corporate mailboxes.'],
    actionsTaken: ['Mass Mailbox Quarantine Executed', 'Session Tokens Revoked']
  },
  {
    id: 'INC-2026-1039',
    title: 'Ransomware Dropper Link via HR Resume',
    classification: 'RANSOMWARE LINK',
    severity: 'CRITICAL',
    status: 'RESOLVED',
    sourceIP: '91.240.118.90',
    sourceLocation: 'Bucharest, Romania',
    sender: 'applicant-review@work-careers.online',
    recipient: 'hr-desk@company.com',
    createdAt: '2026-09-25 18:45:22',
    updatedAt: '2026-09-26 09:12:00',
    assignedTo: 'Threat Response Team',
    notes: ['LockBit payload link isolated before employee opened.'],
    actionsTaken: ['Endpoint Isolated', 'C2 Domain Blocked Globally']
  },
  {
    id: 'INC-2026-1038',
    title: 'Banking Password Reset Spoofing',
    classification: 'PHISHING',
    severity: 'HIGH',
    status: 'INVESTIGATING',
    sourceIP: '162.247.74.200',
    sourceLocation: 'Amsterdam, Netherlands',
    sender: 'alerts@sbi-online-security.org',
    recipient: 'treasury@company.com',
    createdAt: '2026-09-25 15:10:00',
    updatedAt: '2026-09-25 15:40:00',
    assignedTo: 'SOC Analyst - Tier 2',
    notes: ['Spoofed SBI online portal domain.'],
    actionsTaken: ['Evidence Ledger Record Created']
  }
];

export const INITIAL_IOCS: IOC[] = [
  {
    id: 'ioc-1',
    type: 'IP',
    value: '185.220.101.45',
    reputation: 'MALICIOUS',
    confidence: 94,
    source: 'Global Tor Exit & Botnet Feed',
    lastSeen: '2026-09-26 16:30'
  },
  {
    id: 'ioc-2',
    type: 'DOMAIN',
    value: 'paypa1-security.com',
    reputation: 'MALICIOUS',
    confidence: 96,
    source: 'Typosquatting & Phishing Database',
    lastSeen: '2026-09-26 16:32'
  },
  {
    id: 'ioc-3',
    type: 'URL',
    value: 'http://paypa1-security.com/verify-login?session=9841284912',
    reputation: 'MALICIOUS',
    confidence: 92,
    source: 'OpenPhish Threat Stream',
    lastSeen: '2026-09-26 16:32'
  },
  {
    id: 'ioc-4',
    type: 'EMAIL',
    value: 'verify-account@secure-login.xyz',
    reputation: 'SUSPICIOUS',
    confidence: 88,
    source: 'AICTE Threat Intelligence',
    lastSeen: '2026-09-26 15:45'
  },
  {
    id: 'ioc-8',
    type: 'IP',
    value: '103.251.167.12',
    reputation: 'MALICIOUS',
    confidence: 98,
    source: 'CERT-In Threat Feed',
    lastSeen: '2026-09-26 12:00'
  },
  {
    id: 'ioc-9',
    type: 'HASH',
    value: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    reputation: 'MALICIOUS',
    confidence: 99,
    source: 'VirusTotal Malware Corpus',
    lastSeen: '2026-09-26 16:35'
  },
  {
    id: 'ioc-10',
    type: 'DOMAIN',
    value: 'm365-login-verify.info',
    reputation: 'MALICIOUS',
    confidence: 95,
    source: 'PhishTank Feed',
    lastSeen: '2026-09-26 12:04'
  }
];

export const INITIAL_LEDGER_BLOCKS: LedgerBlock[] = [
  {
    blockNumber: 104580,
    blockHash: '0000a12b49c8120e8d9124019284192041924091824091824091824091824091',
    previousHash: '00008f1092418290481204819204918204918240918240918240918240918240',
    evidenceId: 'EVD-2026-00840',
    timestamp: '2026-09-26 12:05:10',
    status: 'VERIFIED',
    dataSummary: 'M365 Phishing Portal Payload Integrity Record'
  },
  {
    blockNumber: 104581,
    blockHash: '0000c39182490182401928409128409182409182409182409182409182409182',
    previousHash: '0000a12b49c8120e8d9124019284192041924091824091824091824091824091',
    evidenceId: 'EVD-2026-00841',
    timestamp: '2026-09-26 14:16:45',
    status: 'VERIFIED',
    dataSummary: 'Executive Wire Transfer Fraud Email Headers'
  },
  {
    blockNumber: 104582,
    blockHash: '00008f4a7d91c32094182490182401928409182409182409182409182409c92a',
    previousHash: '0000c39182490182401928409128409182409182409182409182409182409182',
    evidenceId: 'EVD-2026-00842',
    timestamp: '2026-09-26 16:42:18',
    status: 'VERIFIED',
    dataSummary: 'PayPal Phishing Header & Source IP 185.220.101.45 Verification'
  }
];

export const RECENT_THREAT_EVENTS: ThreatEvent[] = [
  {
    id: 'evt-1',
    timestamp: '16:41:23',
    type: 'URL Detection',
    source: 'OpenPhish Stream',
    severity: 'HIGH',
    message: 'Suspicious URL paypa1-security.com detected in inbound SMTP'
  },
  {
    id: 'evt-2',
    timestamp: '16:41:25',
    type: 'IP Reputation',
    source: 'Tor Exit Node DB',
    severity: 'CRITICAL',
    message: 'IP 185.220.101.45 matched active Tor Exit Node list'
  },
  {
    id: 'evt-3',
    timestamp: '16:41:27',
    type: 'AI Classification',
    source: 'Threat Engine',
    severity: 'HIGH',
    message: 'High-risk phishing email classified with 94% confidence'
  },
  {
    id: 'evt-4',
    timestamp: '16:41:31',
    type: 'Incident Response',
    source: 'Auto-Triage',
    severity: 'HIGH',
    message: 'Incident #INC-2026-1042 created and assigned to SOC Analyst'
  },
  {
    id: 'evt-5',
    timestamp: '16:42:18',
    type: 'Evidence Ledger',
    source: 'SHA-256 Hasher',
    severity: 'LOW',
    message: 'Evidence EVD-2026-00842 appended to Block #104582'
  }
];
