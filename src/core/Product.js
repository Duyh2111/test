/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { read, listRelated } from "./apiCore";
import Card from "./Card";

const Product = (props) => {
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [error, setError] = useState(false);

  const loadSingleProduct = (productId) => {
    read(productId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
        // fetch related products
        listRelated(data._id).then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setRelatedProduct(data);
          }
        });
      }
    });
  };

  useEffect(() => {
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
  }, [props]);

  return (
    <Layout title={product && product.name} className="container-fluid">
      <div className="container">
      <div className="row" >
        <div className="col-6" style={{paddingRight: 100}}>
          {product && product.description && (
            <Card product={product} showViewProductButton={false} />
          )}
        </div>
        <div className="col-6">
          <h3 className="mt-3">Description</h3>
          <div className="mt-2 mb-10">{product.description}</div>
        </div>
      </div>
      <h4 className="mt-4 mb-2">Related products</h4>
      <div className="row col-4">
          {relatedProduct.map((p, i) => (
          <div className="mb-3">
            <Card key={i} product={p} />
          </div>
        ))}
          </div>
          </div>
      
    </Layout>
  );
};

export default Product;
