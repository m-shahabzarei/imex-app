type PageProps = {
  params: {
    parentId: string
    itemId: string
  }
}

async function getZamem(parentId: string) {
  const res = await fetch(
    `https://api.imexapp.ir/book/preferential-tariff/${parentId}`,
    { cache: "no-store" }
  )

 

  return res.json()
}

export default async function Page({ params }: PageProps) {
  const { parentId, itemId } = params

  console.log("parentId:", parentId)
  console.log("itemId:", itemId)

  const data = await getZamem(parentId)

  const item = data.results?.find(
    (x: any) => x.id.toString() === itemId
  )

  if (!item) {
    return <div>یافت نشد</div>
  }

  return (
    <div>
      <h1>{item.title}</h1>
      <p>{item.description}</p>
    </div>
  )
}
