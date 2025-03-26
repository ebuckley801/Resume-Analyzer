import { Separator } from "@/components/ui/separator"
import AccountForm from "./account-form"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import UpdateAccount from "./updateAccount"
import { Label } from "@/components/ui/label"
import { getUserData } from "@/app/lib/data"
import { User, Mail } from "lucide-react"

export const dynamic = 'force-dynamic';

export default async function SettingsAccountPage() {
  const user = await getUserData();

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
        <CardHeader className="space-y-1 pb-8">
          <CardTitle className="text-2xl font-bold tracking-tight">Account Settings</CardTitle>
          <CardDescription className="text-base text-muted-foreground">
            Manage your account information and preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-4 p-6 rounded-xl bg-muted/50 backdrop-blur-sm border border-border/50 transition-all duration-200 hover:bg-muted/70">
                <div className="p-3 rounded-lg bg-primary/10">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-1">
                  <Label className="text-sm font-medium">Name</Label>
                  <p className="text-sm font-medium text-muted-foreground">
                    {user?.firstName} {user?.lastName}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-6 rounded-xl bg-muted/50 backdrop-blur-sm border border-border/50 transition-all duration-200 hover:bg-muted/70">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-1">
                  <Label className="text-sm font-medium">Email</Label>
                  <p className="text-sm font-medium text-muted-foreground">{user?.email}</p>
                </div>
              </div>
            </div>
          </div>
          
          <Separator className="my-8" />
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold">Update Information</h3>
              <p className="text-sm text-muted-foreground">
                Update your account details and preferences
              </p>
            </div>
            <UpdateAccount />
          </div>

          <Separator className="my-8" />
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-destructive">Danger Zone</h3>
              <p className="text-sm text-muted-foreground">
                Once you delete your account, there is no going back. Please be certain.
              </p>
            </div>
            <div className="p-6 rounded-xl border border-destructive/20 bg-destructive/5 backdrop-blur-sm">
              <AccountForm />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
