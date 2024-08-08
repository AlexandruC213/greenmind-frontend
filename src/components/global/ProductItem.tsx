import React, { useState, useEffect } from "react";
import {
  Box,
  Image,
  Text,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { GrFormView } from "react-icons/gr";
import { MdOutlineModeEdit, MdDelete } from "react-icons/md";
import { Product, useProducts } from "@/context/ProductsContext";
import ProductDrawer from "./ProductDrawer";

interface ProductItemProps {
  product: Product;
  isProductPage: boolean;
}

const ProductItem: React.FC<ProductItemProps> = ({
  product,
  isProductPage,
}) => {
  const [showProductDrawer, setShowProductDrawer] = useState<boolean>(false);
  const [productWidth, setProductWidth] = useState<string>("");
  const navigate = useNavigate();

  const { products, perPage, removeProduct } = useProducts();

  useEffect(() => {
    if (products.length <= perPage) {
      const value = 100 / products.length;
      setProductWidth(() => {
        return value < 20 ? "20%" : `${value}%`;
      });
    }
  }, [products.length]);

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="md"
      w={{ base: "100%", md: "60%", xl: productWidth }}
      p={4}
    >
      <Image
        src={`http://localhost:8080/${product.imageUrl}`}
        alt={product.title}
        width="100%"
        height="sm"
        objectFit="fill"
        borderRadius="lg"
      />
      <Flex
        mt={4}
        direction={isProductPage ? "column" : "row"}
        align="center"
        justify="space-between"
      >
        <Text mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
          {product.title} - ${product.price}
        </Text>
        {!isProductPage && (
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<RxHamburgerMenu />}
              variant="outline"
            />
            <MenuList>
              <MenuItem
                onClick={() => navigate(`/products/${product._id}`)}
                icon={<GrFormView size={22} />}
              >
                View
              </MenuItem>
              <MenuItem
                onClick={() => setShowProductDrawer(true)}
                icon={<MdOutlineModeEdit size={22} />}
              >
                Edit
              </MenuItem>
              <MenuItem
                onClick={() => removeProduct(product._id)}
                icon={<MdDelete size={22} />}
              >
                Delete
              </MenuItem>
            </MenuList>
          </Menu>
        )}
        {isProductPage && (
          <Text mt="1" as="h6" lineHeight="tight">
            {product.description}
          </Text>
        )}
      </Flex>
      <ProductDrawer
        showProductDrawer={showProductDrawer}
        onCloseDrawer={() => setShowProductDrawer(false)}
        product={product}
        editMode
      />
    </Box>
  );
};

export default ProductItem;
