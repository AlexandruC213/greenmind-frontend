import React, { useEffect, useState } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Input,
  FormControl,
  FormLabel,
  Spacer,
  Textarea,
  Stack,
  Spinner,
} from "@chakra-ui/react";
import { useToastNotification } from "@/hooks/useToastNotification";
import Cookies from "js-cookie";
import { Product, useProducts } from "@/context/ProductsContext";

interface ProductDrawerProps {
  showProductDrawer: boolean;
  onCloseDrawer: () => void;
  product?: Product;
  editMode?: boolean;
}

const ProductDrawer: React.FC<ProductDrawerProps> = ({
  showProductDrawer,
  onCloseDrawer,
  product,
  editMode = false,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<number | string>("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const showToast = useToastNotification();

  const { addProduct, updateProductInContext } = useProducts();

  useEffect(() => {
    if (showProductDrawer) {
      onOpen();
    }
    if (editMode && product) {
      setTitle(product.title);
      setPrice(product.price);
      setDescription(product.description);
    }
  }, [editMode, product, showProductDrawer, onOpen]);

  const closeDrawerHandler = () => {
    onCloseDrawer();
    onClose();
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!image) {
      showToast("error", "Required!", "Adding an image is required!");
      return;
    }

    const productData: any = {
      title,
      price: Number(price),
      description,
      image,
      userId: Cookies.get("userId")!,
    };

    if (editMode && product) {
      productData._id = product._id;
    }

    try {
      setLoading(true);
      if (editMode && product) {
        await updateProductInContext(productData);
      } else {
        await addProduct(productData);
      }
      showToast(
        "success",
        `Product ${editMode ? "updated" : "created"} successfuly.`
      );
    } catch (error: any) {
      showToast("error", "Creating product failed.", error.message);
    } finally {
      setLoading(false);
      closeDrawerHandler();
    }
  };

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      size="md"
      onClose={closeDrawerHandler}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          {editMode ? "Update Product" : "Add Product"}
        </DrawerHeader>

        <DrawerBody>
          <Stack as="form">
            <FormControl id="title" mb={4} isRequired>
              <FormLabel mb={1}>Title</FormLabel>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Product title"
              />
            </FormControl>
            <FormControl id="price" mb={4} isRequired>
              <FormLabel mb={1}>Price</FormLabel>
              <Input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Product price"
              />
            </FormControl>
            <FormControl id="description" mb={4} isRequired>
              <FormLabel mb={1}>Description</FormLabel>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Product description"
              />
            </FormControl>
            <FormControl id="image" mb={4} isRequired>
              <FormLabel mb={1}>Image</FormLabel>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setImage(e.target.files ? e.target.files[0] : null)
                }
              />
            </FormControl>
          </Stack>
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={closeDrawerHandler}>
            Cancel
          </Button>
          <Spacer />
          <Button colorScheme="blue" onClick={handleFormSubmit}>
            {loading ? <Spinner size="sm" /> : editMode ? "Update" : "Create"}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ProductDrawer;
