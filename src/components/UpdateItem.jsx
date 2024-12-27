import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/method";
import AddItem from "./AddItem";

function UpdateItem() {
  const { $id } = useParams();
  const [item, setItem] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    service.getItem($id).then((item) => {
      if (item) {
        setItem(item);
      } else {
        navigate("/stock");
      }
    });
  }, [$id, navigate]);

  return item ? (
    <div className="py-8">
      <AddItem item={item} />
    </div>
  ) : null;
}

export default UpdateItem;
