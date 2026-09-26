export type Severity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'SAFE';

export type IncidentStatus = 'OPEN' | 'INVESTIGATING' | 'RESOLVED' | 'QUARANTINED';

export type IOCType = 'IP' | 'DOMAIN' | 'URL' | 'EMAIL' | 'HASH' | 'ATTACHMENT';

export type IOCReputation = 'MALICIOUS' | 'SUSPICIOUS' | 'CLEAN' | 'UNKNOWN';

export type UserRole =
  | 'Security Analyst'
  | 'SOC Analyst'
  | 'Incident Responder'
  | 'Administrator'
  | 'Researcher'
  | 'Student / Trainee'
  | 'Other';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  organization: string;
  role: UserRole;
  phone?: string;
  bio?: string;
  avatarUrl?: string;
  accountType: string;
  createdDate: string;
  lastLogin: string;
  status: 'Active' | 'Suspended' | 'Pending';
  twoFactorEnabled: boolean;
}

export interface SessionInfo {
  id: string;
  device: string;
  browser: string;
  location: string;
  ipAddress: string;
  lastActive: string;
  isCurrent: boolean;
}

export interface LoginActivity {
  id: string;
  device: string;
  location: string;
  ipAddress: string;
  date: string;
  status: 'Current Session' | 'Successful' | 'Failed Attempt';
}

export interface NotificationPreferences {
  criticalThreats: boolean;
  highRiskPhishing: boolean;
  suspiciousIOCs: boolean;
  incidentAssigned: boolean;
  incidentStatusChanged: boolean;
  evidenceVerified: boolean;
  reportGenerated: boolean;
  investigationCompleted: boolean;
  productUpdates: boolean;
  marketingCommunications: boolean;
}

export interface AppearancePreferences {
  theme: 'dark' | 'light' | 'system';
  density: 'comfortable' | 'compact';
  enableAnimations: boolean;
  language: string;
  timezone: string;
  dateFormat: string;
  defaultDashboard: string;
}

export interface EmailHeader {
  from: string;
  to: string;
  cc?: string;
  replyTo?: string;
  subject: string;
  date: string;
  messageId: string;
  returnPath: string;
  received: string[];
  sourceIP: string;
  userAgent?: string;
}

export interface AuthenticationResult {
  spf: 'PASSED' | 'FAILED' | 'SOFTFAIL' | 'NONE';
  dkim: 'PASSED' | 'FAILED' | 'NONE';
  dmarc: 'PASSED' | 'FAILED' | 'NONE';
  spfDetails: string;
  dkimDetails: string;
  dmarcDetails: string;
}

export interface ThreatFactor {
  id: string;
  name: string;
  severity: Severity;
  evidence: string;
  explanation: string;
}

export interface IOC {
  id: string;
  type: IOCType;
  value: string;
  reputation: IOCReputation;
  confidence: number;
  source: string;
  lastSeen: string;
  blocked?: boolean;
}

export interface GeoLocation {
  ip: string;
  country: string;
  countryCode: string;
  city: string;
  region: string;
  isp: string;
  asn: string;
  timezone: string;
  latitude: number;
  longitude: number;
  isApproximate: boolean;
}

export interface ThreatAnalysis {
  riskScore: number; // 0 - 100
  severity: Severity;
  classification: 'PHISHING' | 'SUSPICIOUS' | 'SAFE' | 'SPAM' | 'EXECUTIVE IMPERSONATION' | 'RANSOMWARE LINK';
  confidence: number; // 0 - 100
  aiExplanation: string;
  factors: ThreatFactor[];
  recommendedActions: string[];
}

export interface EmailData {
  id: string;
  rawText: string;
  headers: EmailHeader;
  auth: AuthenticationResult;
  bodyText: string;
  bodyHtml?: string;
  urls: string[];
  attachments: { name: string; size: string; mime: string; hash: string }[];
}

export interface ForensicTimelineEvent {
  id: string;
  timestamp: string;
  stage: string;
  description: string;
  status: 'completed' | 'in-progress' | 'flagged';
  details?: string;
}

export interface EvidenceItem {
  id: string;
  incidentId: string;
  timestamp: string;
  type: string;
  hash: string;
  algorithm: 'SHA-256';
  verified: boolean;
  rawPayload: string;
}

export interface LedgerBlock {
  blockNumber: number;
  blockHash: string;
  previousHash: string;
  evidenceId: string;
  timestamp: string;
  status: 'VERIFIED' | 'PENDING';
  dataSummary: string;
}

export interface Incident {
  id: string;
  title: string;
  classification: string;
  severity: Severity;
  status: IncidentStatus;
  sourceIP: string;
  sourceLocation: string;
  sender: string;
  recipient: string;
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
  notes?: string[];
  actionsTaken?: string[];
  emailData?: EmailData;
  analysis?: ThreatAnalysis;
  iocs?: IOC[];
  geoLocation?: GeoLocation;
  timeline?: ForensicTimelineEvent[];
}

export interface ThreatEvent {
  id: string;
  timestamp: string;
  type: string;
  source: string;
  severity: Severity;
  message: string;
}

export interface Notification {
  id: string;
  timestamp: string;
  title: string;
  message: string;
  type: 'danger' | 'warning' | 'info' | 'success';
  read: boolean;
  link?: string;
}
