export async function fetchDashboardTasks() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACKEND}/tasks/dashboard`
  );

  if (!res.ok) {
    throw new Error("Error al obtener las tareas del dashboard");
  }

  return res.json();
}
