import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Heading,
  Button,
  Flex,
  Text,
  Spinner,
  Center,
} from "@chakra-ui/react";
import ProductItem from "@/components/global/ProductItem";
import { Product, useProducts } from "@/context/ProductsContext";
import { useNavigate } from "react-router-dom";

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const { fetchProductById } = useProducts();

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const product = await fetchProductById(id!);
        if (product) {
          setProduct(product);
        } else {
          setError("Product not found");
        }
      } catch (err) {
        setError("Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id, fetchProductById]);

  if (loading) {
    return (
      <Center height="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center height="100vh">
        <Text color="red.500">{error}</Text>
      </Center>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <Container maxW="container.xl" py={4}>
      {!product ? (
        <Heading as="h1" size="2xl" my={6}>
          No Product Found
        </Heading>
      ) : (
        <>
          <Heading as="h1" size="2xl" my={6}>
            Product Page
          </Heading>
          <Flex w="100%" justify={"center"} align={"center"}>
            <ProductItem product={product} key={product._id} isProductPage />
          </Flex>
          <Flex mt={10} justifyContent="center">
            <Button onClick={() => navigate("/products")}>Go Back</Button>
          </Flex>
        </>
      )}
    </Container>
  );
};

export default ProductPage;
