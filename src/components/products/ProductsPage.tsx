import React, { useState, useEffect } from "react";
import { Container, Heading, Button, Flex } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import ProductDrawer from "../global/ProductDrawer";
import Cookies from "js-cookie";
import ProductItem from "../global/ProductItem";
import { useProducts } from "@/context/ProductsContext";

const ProductsPage: React.FC = () => {
  const [showProductDrawer, setShowProductDrawer] = useState<boolean>(false);

  const { products, page, perPage, hasPrevPage, hasNextPage, fetchProducts } =
    useProducts();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = Cookies.get("authToken");
    if (!authToken) {
      return navigate("/login");
    }
    const fetchProductsPage = async () => {
      const query = new URLSearchParams(location.search);
      const pageQuery = query.get("page") || "1";
      const perPageQuery = query.get("perPage") || "3";
      fetchProducts(+pageQuery, +perPageQuery);
    };

    fetchProductsPage();
  }, [location.search]);

  const handlePageChange = (newPage: number) => {
    navigate(`?page=${newPage}&perPage=${perPage}`);
  };

  return (
    <Container maxW="container.xl" py={4}>
      <Heading
        as="h1"
        size="2xl"
        my={6}
        textAlign={{ base: "center", xl: "left" }}
      >
        Products Page
      </Heading>
      <Flex
        w="100%"
        direction={{ base: "column", xl: "row" }}
        justify={{ base: "center", xl: "flex-start" }}
        align={{ base: "center", xl: "flex-start" }}
        gap={8}
      >
        {products.map((product) => (
          <ProductItem
            product={product}
            key={product._id}
            isProductPage={false}
          />
        ))}
      </Flex>

      <Flex mt={10} justify="center">
        <Button onClick={() => setShowProductDrawer(true)} mr={4}>
          Create new product
        </Button>
        <Button
          onClick={() => handlePageChange(page - 1)}
          isDisabled={!hasPrevPage}
        >
          Previous Page
        </Button>
        <Button
          ml={4}
          onClick={() => handlePageChange(page + 1)}
          isDisabled={!hasNextPage}
        >
          Next Page
        </Button>
      </Flex>
      <ProductDrawer
        showProductDrawer={showProductDrawer}
        onCloseDrawer={() => setShowProductDrawer(false)}
      />
    </Container>
  );
};

export default ProductsPage;
