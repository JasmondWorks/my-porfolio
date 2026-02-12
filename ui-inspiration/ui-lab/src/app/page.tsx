"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import {
  AccordionTrigger,
  AccordionContent,
  AccordionItem,
  Accordion,
} from "@/components/ui/Accordion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import { Alert, AlertDescription, Badge } from "@/components/ui/Alert";
import { Modal, ModalFooter } from "@/components/ui/Modal";
import {} from // Textarea,
// Checkbox,
// Switch,
// Select,
"@/components/ui/FormElements";
import { Table, Column } from "@/components/ui/Table";
import { PricingCard } from "@/components/ui/PricingCard";
import { StatCard } from "@/components/ui/StatCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { Field } from "@/components/ui/Field";
import { FileUpload } from "@/components/ui/FileUpload";
import { Avatar, AvatarGroup } from "@/components/ui/Avatar";
import { useToast } from "@/components/ui/Toast";
import {
  Search,
  Bell,
  CheckCircle,
  AlertTriangle,
  Info,
  User,
  CreditCard,
  MoreHorizontal,
  FileText,
  Inbox,
  BarChart3,
  DollarSign,
  Users,
  UploadCloud,
} from "lucide-react";

export default function Home() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [openSections, setOpenSections] = React.useState<Set<string>>(
    new Set(),
  );
  const { addToast } = useToast();

  // --- MOCK DATA ---
  const users = React.useMemo(
    () => [
      {
        id: 1,
        name: "Alice Johnson",
        email: "alice@example.com",
        role: "Admin",
        status: "Active",
      },
      {
        id: 2,
        name: "Bob Smith",
        email: "bob@example.com",
        role: "Editor",
        status: "Offline",
      },
      {
        id: 3,
        name: "Charlie Brown",
        email: "charlie@example.com",
        role: "User",
        status: "Active",
      },
      {
        id: 4,
        name: "Diana Prince",
        email: "diana@example.com",
        role: "Admin",
        status: "Active",
      },
      {
        id: 5,
        name: "Evan Wright",
        email: "evan@example.com",
        role: "User",
        status: "Inactive",
      },
    ],
    [],
  );

  const userColumns: Column<(typeof users)[0]>[] = React.useMemo(
    () => [
      {
        key: "name",
        header: "Name",
        cell: (u) => (
          <div className="flex items-center space-x-3">
            <Avatar fallback={u.name.charAt(0)} size="sm" />
            <div className="font-medium text-text-primary">{u.name}</div>
          </div>
        ),
        sortable: true,
      },
      {
        key: "email",
        header: "Email",
        cell: (u) => <div className="text-text-secondary">{u.email}</div>,
      },
      {
        key: "role",
        header: "Role",
        cell: (u) => <Badge variant="outline">{u.role}</Badge>,
      },
      {
        key: "status",
        header: "Status",
        cell: (u) => (
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
              u.status === "Active"
                ? "bg-state-success/10 text-state-success"
                : "bg-text-tertiary/10 text-text-secondary"
            }`}
          >
            {u.status}
          </span>
        ),
      },
    ],
    [],
  );

  // Component Groups Definition
  const componentGroups = React.useMemo(
    () => [
      {
        id: "media",
        title: "Media & Uploads",
        description: "File inputs, drag-and-drop zones, and avatars.",
        icon: <UploadCloud className="h-5 w-5" />,
        content: (
          <div className="space-y-8">
            <div className="flex items-center gap-8">
              <div className="space-y-2">
                <Label>User Avatars</Label>
                <div className="flex gap-4 items-center">
                  <Avatar
                    fallback="JD"
                    size="lg"
                    src="https://github.com/shadcn.png"
                  />
                  <Avatar fallback="AB" size="md" />
                  <Avatar fallback="C" size="sm" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Avatar Group</Label>
                <AvatarGroup>
                  <Avatar fallback="A" />
                  <Avatar fallback="B" />
                  <Avatar fallback="C" />
                  <Avatar fallback="+2" className="bg-surface-subtle text-xs" />
                </AvatarGroup>
              </div>
            </div>

            <div className="space-y-2 max-w-xl">
              <Label>Upload Documents</Label>
              <FileUpload
                onFilesSelected={(files) =>
                  addToast(`Uploaded ${files.length} files`, "success")
                }
                accept=".pdf,.png,.jpg"
              />
            </div>
          </div>
        ),
      },
      {
        id: "stats",
        title: "Dashboard & Stats",
        description: "Metric cards with trends and indicators.",
        icon: <BarChart3 className="h-5 w-5" />,
        content: (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              title="Total Revenue"
              value="$45,231.89"
              icon={<DollarSign className="h-4 w-4" />}
              trend={{ value: "+20.1%", direction: "up" }}
            />
            <StatCard
              title="Subscriptions"
              value="+2350"
              icon={<Users className="h-4 w-4" />}
              trend={{ value: "+180.1%", direction: "up" }}
            />
            <StatCard
              title="Bounce Rate"
              value="12.32%"
              icon={<BarChart3 className="h-4 w-4" />}
              trend={{
                value: "-4.05%",
                direction: "down",
                label: "lower is better",
              }}
            />
          </div>
        ),
      },
      {
        id: "tables",
        title: "Data Tables",
        description: "Advanced tables with sorting, selection, and pagination.",
        icon: <FileText className="h-5 w-5" />,
        content: (
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Users</CardTitle>
                <CardDescription>
                  Manage your team members and their account permissions here.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table
                  data={users}
                  columns={userColumns}
                  selectable
                  pagination={{ pageSize: 3 }}
                  actions={(item) => (
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  )}
                />
              </CardContent>
            </Card>
          </div>
        ),
      },
      {
        id: "pricing",
        title: "Pricing Cards",
        description: "Tiered pricing layouts with feature lists.",
        icon: <DollarSign className="h-5 w-5" />,
        content: (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PricingCard
              tier="Starter"
              price="$0"
              description="For individuals just getting started."
              features={[
                { text: "1 Project", included: true },
                { text: "Community Support", included: true },
                { text: "4GB Storage", included: false },
              ]}
              onCtaClick={() => addToast("Selected Starter Plan", "info")}
            />
            <PricingCard
              tier="Pro"
              price="$29"
              description="For professionals and growing teams."
              popular
              features={[
                { text: "Unlimited Projects", included: true },
                { text: "Priority Support", included: true },
                { text: "10GB Storage", included: true },
                { text: "Analytics", included: true },
              ]}
              ctaText="Start Free Trial"
              onCtaClick={() => addToast("Selected Pro Plan", "success")}
            />
            <PricingCard
              tier="Enterprise"
              price="$99"
              description="For large organizations."
              features={[
                { text: "Unlimited Everything", included: true },
                { text: "Dedicated Support", included: true },
                { text: "SSO & Security", included: true },
                { text: "Custom Contract", included: true },
              ]}
              ctaText="Contact Sales"
              onCtaClick={() => addToast("Contacted Sales", "warning")}
            />
          </div>
        ),
      },
      {
        id: "forms",
        title: "Forms & Field Inputs",
        description: "Polymorphic fields and complex layouts.",
        icon: <User className="h-5 w-5" />,
        content: (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>
                  Update your personal information.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Field label="First Name" placeholder="Jane" />
                  <Field label="Last Name" placeholder="Doe" />
                </div>
                <Field
                  label="Email"
                  type="email"
                  placeholder="jane@example.com"
                  helperText="We'll never share your email."
                />
                <Field
                  label="Bio"
                  as="textarea"
                  placeholder="Tell us about yourself"
                />
                <Field label="Role" as="select">
                  <option>Developer</option>
                  <option>Designer</option>
                  <option>Manager</option>
                </Field>
                <div className="pt-2">
                  <Field label="Enable Notifications" as="switch" />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => addToast("Settings saved!", "success")}>
                  Save Changes
                </Button>
              </CardFooter>
            </Card>

            <Card className="flex items-center justify-center p-6 bg-surface-subtle/50">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
              quod.
              {/* <EmptyState
                icon={<Inbox className="h-6 w-6" />}
                title="No messages"
                description="You haven't received any messages yet. When you do, they'll appear here."
                action={{
                  label: "Refresh",
                  onClick: () => addToast("Refreshing inbox...", "info"),
                }}
              /> */}
            </Card>
          </div>
        ),
      },
      {
        id: "alerts",
        title: "Alerts & Notifications",
        description: "Badges, callouts, and status indicators.",
        icon: <Bell className="h-5 w-5" />,
        content: (
          <div className="space-y-6 bg-surface-base p-6 rounded-lg border border-border-default">
            <div className="flex flex-wrap gap-4">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>

            <div className="space-y-4">
              <Button
                variant="outline"
                onClick={() => addToast("This is a success toast", "success")}
              >
                Trigger Success Toast
              </Button>
              <Button
                variant="outline"
                onClick={() => addToast("This is an error toast", "error")}
              >
                Trigger Error Toast
              </Button>

              <Alert variant="info">
                <Info className="h-4 w-4" />
                <AlertDescription>
                  <span className="font-semibold block mb-1">
                    Update Available
                  </span>
                  New version 2.4.0 is available for download.
                </AlertDescription>
              </Alert>
            </div>
          </div>
        ),
      },
      {
        id: "modals",
        title: "Modals & Overlays",
        description: "Dialogs and interactive overlays.",
        icon: <CreditCard className="h-5 w-5" />,
        content: (
          <div className="h-40 flex items-center justify-center bg-surface-subtle rounded-lg border border-border-default border-dashed">
            <Button onClick={() => setIsModalOpen(true)}>
              Open Demo Modal
            </Button>

            <Modal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              title="Delete Project?"
              description="This action cannot be undone. This will permanently delete your account and remove your data from our servers."
            >
              <div className="py-2">
                <p className="text-sm">
                  Please type{" "}
                  <span className="font-mono text-xs bg-surface-subtle p-1 rounded">
                    DELETE
                  </span>{" "}
                  to confirm.
                </p>
                <Input className="mt-2" placeholder="DELETE" />
              </div>
              <ModalFooter>
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    setIsModalOpen(false);
                    addToast("Project deleted", "destructive");
                  }}
                >
                  Delete Account
                </Button>
              </ModalFooter>
            </Modal>
          </div>
        ),
      },
    ],
    [addToast, isModalOpen, users, userColumns],
  );

  const filteredGroups = React.useMemo(
    () =>
      componentGroups.filter(
        (group) =>
          group.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          group.description.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [componentGroups, searchTerm],
  );

  React.useEffect(() => {
    if (searchTerm) {
      setOpenSections(new Set(filteredGroups.map((g) => g.id)));
    } else {
      setOpenSections(new Set());
    }
  }, [searchTerm, filteredGroups]);

  const toggleSection = (id: string) => {
    const next = new Set(openSections);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setOpenSections(next);
  };

  return (
    <main className="min-h-screen bg-surface-subtle font-sans pb-24">
      {/* Search Header */}
      <div className="sticky top-0 z-40 w-full bg-surface-base/80 backdrop-blur-md border-b border-border-default">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-text-primary tracking-tight">
                Vault UI Lab
              </h1>
              <p className="text-sm text-text-secondary">
                Component Design System
              </p>
            </div>
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-tertiary" />
              <input
                type="search"
                placeholder="Search components..."
                className="w-full h-10 pl-10 pr-4 rounded-md border border-border-default bg-surface-subtle text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">
        {/* Intro */}
        {!searchTerm && (
          <div className="text-center space-y-4 mx-auto mb-12">
            <h2 className="text-3xl font-bold text-text-primary">
              Design System Components
            </h2>
            <p className="text-text-secondary text-lg">
              A comprehensive collection of reusable UI components extracted
              from high-quality production screenshots.
            </p>
            <div className="flex justify-center gap-3">
              <Badge variant="secondary" className="px-3 py-1">
                v1.2.0
              </Badge>
              <Badge variant="outline" className="px-3 py-1">
                Tailwind v4
              </Badge>
              <Badge variant="success" className="px-3 py-1">
                Accessible
              </Badge>
            </div>
          </div>
        )}

        {/* Results */}
        {filteredGroups.length > 0 ? (
          <Accordion className="space-y-4">
            {filteredGroups.map((group) => (
              <AccordionItem
                key={group.id}
                className="bg-surface-base border border-border-default rounded-xl overflow-hidden shadow-sm"
              >
                <AccordionTrigger
                  className="px-6 py-4 hover:bg-surface-subtle/50"
                  isOpen={openSections.has(group.id)}
                  onClick={() => toggleSection(group.id)}
                >
                  <div className="flex items-center gap-4 text-left">
                    <div className="p-2 bg-brand-primary/10 rounded-lg text-brand-primary">
                      {group.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary">
                        {group.title}
                      </h3>
                      <p className="text-sm text-text-secondary font-normal">
                        {group.description}
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent
                  className="px-6 py-6 border-t border-border-default"
                  isOpen={openSections.has(group.id)}
                >
                  {group.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <div className="text-center py-20 text-text-tertiary">
            <Search className="h-12 w-12 mx-auto mb-4 opacity-20" />
            <p className="text-lg">
              No components found for &quot;{searchTerm}&quot;
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
