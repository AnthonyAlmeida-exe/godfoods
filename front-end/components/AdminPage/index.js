import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import { gql } from "apollo-boost";

import Axios from "axios";
import { Flex, Spinner } from "@chakra-ui/react";

function AdminPage() {
  const [da, setData] = useState();

  const [ordersTodo, setOrdersTodo] = useState([]);
  const [ordersDoing, setOrdersDoing] = useState([]);
  const [ordersDone, setOrdersDone] = useState([]);
  const [change, setChange] = useState(false);
  const [loading, setLoading] = useState(false);

  const [id, setId] = useState();

  const test = async () => {
    const { data } = await Axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/orders`
    );
    if (data !== da) {
      let orderTodo = [];
      let orderDoing = [];
      let orderDone = [];
      data.map((e) => {
        switch (e.status) {
          case "na fila":
            orderTodo.push(e);
            break;
          case "preparando":
            orderDoing.push(e);
            break;
          case "pronto para entrega":
            orderDone.push(e);
            break;
          default:
            break;
        }
      });

      setOrdersTodo(orderTodo);
      setOrdersDoing(orderDoing);
      setOrdersDone(orderDone);
      setData(data);
      setLoading(false);
    }
  };

  const onDragEnd = async (result) => {
    const { source, destination } = result;
    setLoading(true);
    await Axios.put(`${process.env.NEXT_PUBLIC_API_URL}/orders/${id}`, {
      status: destination.droppableId,
    });

    setChange(true);
  };

  useEffect(() => {
    test();
    setChange(false);
  }, [change]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "100%",
        flexWrap: "wrap",
      }}
    >
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result)}
        onDragStart={(e) => {
          setId(e.draggableId);
        }}
      >
        {ordersTodo && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h2>Na fila</h2>
            <div style={{ margin: 8 }}>
              <Droppable droppableId={"na fila"}>
                {(provided, snapshot) => {
                  return (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={{
                        background: snapshot.isDraggingOver
                          ? "lightblue"
                          : "lightgrey",
                        padding: 4,
                        width: 250,
                        minHeight: 500,
                      }}
                    >
                      {ordersTodo.map((item, index) => {
                        return (
                          <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}
                          >
                            {(provided, snapshot) => {
                              return (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  style={{
                                    userSelect: "none",
                                    padding: 16,
                                    margin: "0 0 8px 0",
                                    minHeight: "50px",
                                    backgroundColor: snapshot.isDragging
                                      ? "#263B4A"
                                      : "#456C86",
                                    color: "white",
                                    ...provided.draggableProps.style,
                                  }}
                                >
                                  {loading && id === item.id ? (
                                    <Flex
                                      padding="40px"
                                      alignItems="center"
                                      direction="column"
                                    >
                                      <Spinner size="lg" />
                                    </Flex>
                                  ) : (
                                    <>
                                      Nome: {item.user?.username}
                                      <br />
                                      <h6>Itens:</h6>
                                      {item.dishes.map((e) => {
                                        return (
                                          <div>
                                            {e.name} - {e.quantity}X
                                          </div>
                                        );
                                      })}
                                      Endereço: {item.city}-{item.address}
                                    </>
                                  )}
                                </div>
                              );
                            }}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  );
                }}
              </Droppable>
            </div>
          </div>
        )}
        {ordersDoing && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h2>Preparando</h2>
            <div style={{ margin: 8 }}>
              <Droppable droppableId={"preparando"}>
                {(provided, snapshot) => {
                  return (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={{
                        background: snapshot.isDraggingOver
                          ? "lightblue"
                          : "lightgrey",
                        padding: 4,
                        width: 250,
                        minHeight: 500,
                      }}
                    >
                      {ordersDoing.map((item, index) => {
                        return (
                          <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}
                          >
                            {(provided, snapshot) => {
                              return (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  style={{
                                    userSelect: "none",
                                    padding: 16,
                                    margin: "0 0 8px 0",
                                    minHeight: "50px",
                                    backgroundColor: snapshot.isDragging
                                      ? "#263B4A"
                                      : "#456C86",
                                    color: "white",
                                    ...provided.draggableProps.style,
                                  }}
                                >
                                  {loading && id === item.id ? (
                                    <Flex
                                      padding="40px"
                                      alignItems="center"
                                      direction="column"
                                    >
                                      <Spinner size="lg" />
                                    </Flex>
                                  ) : (
                                    <>
                                      Nome: {item.user?.username}
                                      <br />
                                      <h6>Itens:</h6>
                                      {item.dishes.map((e) => {
                                        return (
                                          <div>
                                            {e.name} - {e.quantity}X
                                          </div>
                                        );
                                      })}
                                      Endereço: {item.city}-{item.address}
                                    </>
                                  )}
                                </div>
                              );
                            }}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  );
                }}
              </Droppable>
            </div>
          </div>
        )}
        {ordersDone && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h2>Pronto para entrega</h2>
            <div style={{ margin: 8 }}>
              <Droppable droppableId={"pronto para entrega"}>
                {(provided, snapshot) => {
                  return (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={{
                        background: snapshot.isDraggingOver
                          ? "lightblue"
                          : "lightgrey",
                        padding: 4,
                        width: 250,
                        minHeight: 500,
                      }}
                    >
                      {ordersDone.map((item, index) => {
                        return (
                          <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}
                          >
                            {(provided, snapshot) => {
                              return (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  style={{
                                    userSelect: "none",
                                    padding: 16,
                                    margin: "0 0 8px 0",
                                    minHeight: "50px",
                                    backgroundColor: snapshot.isDragging
                                      ? "#263B4A"
                                      : "#456C86",
                                    color: "white",
                                    ...provided.draggableProps.style,
                                  }}
                                >
                                  {loading && id === item.id ? (
                                    <Flex
                                      padding="40px"
                                      alignItems="center"
                                      direction="column"
                                    >
                                      <Spinner size="lg" />
                                    </Flex>
                                  ) : (
                                    <>
                                      Nome: {item.user?.username}
                                      <br />
                                      <h6>Itens:</h6>
                                      {item.dishes.map((e) => {
                                        return (
                                          <div>
                                            {e.name} - {e.quantity}X
                                          </div>
                                        );
                                      })}
                                      Endereço: {item.city}-{item.address}
                                    </>
                                  )}
                                </div>
                              );
                            }}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  );
                }}
              </Droppable>
            </div>
          </div>
        )}
      </DragDropContext>
    </div>
  );
}

export default AdminPage;
