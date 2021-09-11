import { useRouter } from "next/router";

const ButikSlug = ({ productList }) => {
  const router = useRouter();
  const buticSlug = router.query.buticSlug;
  return (
    <div className="product-item">
     <h1>{buticSlug}</h1>
    </div>
  )
}

export default ButikSlug;