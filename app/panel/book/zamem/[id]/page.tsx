/* eslint-disable @typescript-eslint/no-explicit-any */

async function getPost(id: string) {
  const res = await fetch(
    `https://api.imexapp.ir/book/preferential-tariff/?page=1&search=&date_after=2025-03-21&date_before=2026-03-20&country=${id}`,
    { cache: 'no-store' }
  )

//   if (!res.ok) {
//     throw new Error('Failed to fetch data')
//   }

  return res.json()
}

type PageProps = {
  params: Promise<{
    id: string
  }>
}

export default async function Page({ params }: PageProps) {
  const { id } = await params  

  const data = await getPost(id)
  console.log(data)

  return (
    <div>
      <h1>Country ID: {id}</h1>
      {/* مثال استفاده از دیتا */}
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  )
}
