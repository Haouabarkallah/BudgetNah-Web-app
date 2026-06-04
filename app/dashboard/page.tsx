export default function DashboardPage() {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        BudgetNah Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border rounded-lg p-4 shadow">
          <h2 className="font-semibold">Balance</h2>
          <p className="text-2xl">$0.00</p>
        </div>

        <div className="border rounded-lg p-4 shadow">
          <h2 className="font-semibold">Income</h2>
          <p className="text-2xl">$0.00</p>
        </div>

        <div className="border rounded-lg p-4 shadow">
          <h2 className="font-semibold">Expenses</h2>
          <p className="text-2xl">$0.00</p>
        </div>
      </div>
    </main>
  );
}