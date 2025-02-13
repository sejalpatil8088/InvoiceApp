"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import InvoiceForm from "@/components/invoice-form";

export default function InvoicePage() {
  const router = useRouter()

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      router.push("/")
    }
  }, [router])

  return (
    <div className="min-h-screen bg-gray-50">
      <InvoiceForm />
    </div>
  )
}

