import prisma from "@/lib/prisma";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function CustomersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const pageSize = 10;
  const skip = (page - 1) * pageSize;

  const [customers, totalCustomers] = await Promise.all([
    prisma.customer.findMany({
      skip: skip,
      take: pageSize,
      orderBy: { id: "desc" },
    }),
    prisma.customer.count(),
  ]);

  const totalPages = Math.ceil(totalCustomers / pageSize);

  return (
    <main className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Customer List</h1>
        <Button asChild>
            <Link href="/customers/add">Add New Customer</Link>
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
             <TableHead>Name</TableHead>
             <TableHead>Address</TableHead>
             <TableHead>Phone Number</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.length > 0 ? (
            customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.id}</TableCell>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.address}</TableCell>
                <TableCell>{customer.phone}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                 No customer data found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex justify-center gap-2 mt-6">
        {page > 1 && (
          <Button
            variant="outline"
            asChild
            className="px-3 py-1"
          >
             <Link href={`/customers?page=${page - 1}`}>Previous</Link>
          </Button>
        )}
        <div className="flex items-center px-4 text-sm">
           Page {page} of {totalPages || 1}
        </div>
        {page < totalPages && (
          <Button
            variant="outline"
            asChild
            className="px-3 py-1"
          >
             <Link href={`/customers?page=${page + 1}`}>Next</Link>
          </Button>
        )}
      </div>
    </main>
  );
}
