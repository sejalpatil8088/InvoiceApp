
"use client"

import { useFormik } from "formik"
import * as Yup from "yup"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { useState } from "react"

const invoiceSchema = Yup.object().shape({
  vendor: Yup.string().required("Vendor is required"),
  vendorAddress: Yup.string().required("Vendor address is required"),
  purchaseOrder: Yup.string().required("Purchase order is required"),
  invoiceNumber: Yup.string().required("Invoice number is required"),
  totalAmount: Yup.number().required("Total amount is required"),
  invoiceDate: Yup.date().required("Invoice date is required"),
  dueDate: Yup.date().required("Due date is required"),
  paymentTerms: Yup.string().required("Payment terms are required"),
  description: Yup.string().required("Description is required"),
  lineAmount: Yup.number().required("Line amount is required"),
  department: Yup.string().required("Department is required"),
  location: Yup.string().required("Location is required"),
  comments: Yup.string(),
})

export default function InvoiceForm() {
  const router = useRouter()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [activeTab, setActiveTab] = useState("vendor")
  const [showExpenseDetails, setShowExpenseDetails] = useState(true)
  

  const formik = useFormik({
    initialValues: {
      vendor: "",
      vendorAddress: "100 Main St, Lynn",
      purchaseOrder: "",
      invoiceNumber: "",
      totalAmount: "",
      invoiceDate: "",
      dueDate: "",
      paymentTerms: "",
      description: "",
      lineAmount: "",
      department: "",
      location: "",
      comments: "",
    },
    validationSchema: invoiceSchema,
    onSubmit: (values) => {
      localStorage.setItem("invoiceData", JSON.stringify(values))
      router.push("/success")
    },
  })

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0])
    }
  }
  
  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex items-center mb-6 text-gray-600">
        <ChevronLeft className="w-5 h-5 mr-2" />
        <h1 className="text-lg">Create New Invoice</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left side - PDF Upload */}
        <div className="space-y-4">
          <Card className="border-gray-200">
            <CardContent className="p-6">
              <h2 className="font-medium mb-2">Upload Your Invoice</h2>
              <p className="text-sm text-gray-500 mb-4">To auto-populate fields and save time</p>
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-lg p-8">
                <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <input type="file" accept=".pdf" onChange={handleFileChange} className="hidden" id="pdf-upload" />
                <label
                  htmlFor="pdf-upload"
                  className="cursor-pointer bg-white border border-gray-200 rounded-md px-4 py-2 text-sm hover:bg-gray-50"
                >
                  Upload File
                </label>
                {selectedFile && (
                      <p className="text-sm text-gray-700 mt-2">Uploaded: {selectedFile.name}</p> 
                 )}
                <p className="text-xs text-gray-500 mt-2">Click to upload or Drag and drop</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right side - Form */}
        <div className="space-y-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
              <TabsTrigger
                value="vendor"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent"
              >
                Vendor Details
              </TabsTrigger>
              <TabsTrigger
                value="invoice"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent"
              >
                Invoice Details
              </TabsTrigger>
              <TabsTrigger
                value="comments"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent"
              >
                Comments
              </TabsTrigger>
            </TabsList>

            <form onSubmit={formik.handleSubmit}   className="mt-6">
              <TabsContent value="vendor" className="m-0">
                <Card className="border-gray-200">
                  <CardContent className="p-6 space-y-6">
                    <div>
                      <h3 className="text-sm font-medium mb-4">Vendor Information</h3>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="vendor">Vendor *</Label>
                          <Select
                            name="vendor"
                            onValueChange={(value) => formik.setFieldValue("vendor", value)}
                            value={formik.values.vendor}
                          >
                            <SelectTrigger className="mt-1.5">
                              <SelectValue placeholder="Select vendor" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="vendor1">A - 1 Cleaners</SelectItem>
                              <SelectItem value="vendor2">B & B Services</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">{formik.values.vendorAddress}</p>
                          <Link href="#" className="text-sm text-blue-500 hover:underline">
                            View Vendor Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="invoice" className="m-0">
                <Card className="border-gray-200">
                  <CardContent className="p-6 space-y-6">
                    <div>
                      <h3 className="text-sm font-medium mb-4">General Information</h3>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="purchaseOrder">Purchase Order Number *</Label>
                          <Select
                            name="purchaseOrder"
                            onValueChange={(value) => formik.setFieldValue("purchaseOrder", value)}
                            value={formik.values.purchaseOrder}
                          >
                            <SelectTrigger className="mt-1.5">
                              <SelectValue placeholder="Select PO number" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="po1">PO-2024-001</SelectItem>
                              <SelectItem value="po2">PO-2024-002</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-4">Invoice Details</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="invoiceNumber">Invoice Number *</Label>
                          <Input id="invoiceNumber" className="mt-1.5" {...formik.getFieldProps("invoiceNumber")} />
                        </div>
                        <div>
                          <Label htmlFor="paymentTerms">Payment Terms *</Label>
                          <Select
                            name="paymentTerms"
                            onValueChange={(value) => formik.setFieldValue("paymentTerms", value)}
                            value={formik.values.paymentTerms}
                          >
                            <SelectTrigger className="mt-1.5">
                              <SelectValue placeholder="Select terms" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="net30">Net 30</SelectItem>
                              <SelectItem value="net60">Net 60</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="totalAmount">Total Amount *</Label>
                          <div className="relative mt-1.5">
                            <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                            <Input
                              id="totalAmount"
                              type="number"
                              className="pl-7"
                              {...formik.getFieldProps("totalAmount")}
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="invoiceDate">Invoice Date *</Label>
                          <Input
                            id="invoiceDate"
                            type="date"
                            className="mt-1.5"
                            {...formik.getFieldProps("invoiceDate")}
                          />
                        </div>
                        <div>
                          <Label htmlFor="dueDate">Due Date *</Label>
                          <Input id="dueDate" type="date" className="mt-1.5" {...formik.getFieldProps("dueDate")} />
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-medium">Expense Details</h3>
                        <div className="flex items-center space-x-2">
                          <Switch checked={showExpenseDetails} onCheckedChange={setShowExpenseDetails} />
                          <span className="text-sm text-gray-500">${formik.values.lineAmount || "0.00"} / $0.00</span>
                        </div>
                      </div>

                      {showExpenseDetails && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="lineAmount">Line Amount *</Label>
                              <div className="relative mt-1.5">
                                <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                                <Input
                                  id="lineAmount"
                                  type="number"
                                  className="pl-7"
                                  {...formik.getFieldProps("lineAmount")}
                                />
                              </div>
                            </div>
                            <div>
                              <Label htmlFor="department">Department *</Label>
                              <Select
                                name="department"
                                onValueChange={(value) => formik.setFieldValue("department", value)}
                                value={formik.values.department}
                              >
                                <SelectTrigger className="mt-1.5">
                                  <SelectValue placeholder="Select department" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="it">IT</SelectItem>
                                  <SelectItem value="hr">HR</SelectItem>
                                  <SelectItem value="finance">Finance</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="description">Description *</Label>
                            <Textarea id="description" className="mt-1.5" {...formik.getFieldProps("description")} />
                          </div>
                          <Button type="button" variant="outline" className="w-full border-dashed">
                            + Add Expense Coding
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="comments" className="m-0">
                <Card className="border-gray-200">
                  <CardContent className="p-6">
                    <Textarea
                      id="comments"
                      placeholder="Add a comment and use @name to tag someone"
                      className="min-h-[100px]"
                      {...formik.getFieldProps("comments")}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
                
              <div className="flex justify-between mt-6">
                <Button type="button" variant="outline"
                  onClick={() => {
                    localStorage.setItem("draftForm", JSON.stringify(formik.values));
                    alert("Draft saved successfully!");
                  }}
                >
                  Save as Draft
                </Button>
                <Button type="submit">Submit</Button>
                 
              </div>
            </form>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

