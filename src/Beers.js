import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import styled from "styled-components";

const Container = styled.div`
margin-left: 10px;
min-height: 100vh;
`;

const Row = styled.div`
  padding-top: 10px;
`;

const Col = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  overflow-x: none;
  flex-wrap: wrap;
`;

const Card = styled.div`
  display: flex;
  height: 250px;
  width: 300px;
  margin: 10px;
  padding: 10px;
  border: 1px solid black;
  z-index:5;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  background-color: white;
  border-radius: 5px;
  &:hover {
    transform: scale(1.1);
    border: 3px solid green;
    box-shadow:2px 2px 4px green;
    background-color: rgb(173, 247, 190);
  }
`;

const Img = styled.img`
  display: flex;
  align-self: left;
  padding: 10px;
  max-height: 200px;
`;

const Info = styled.span`
  overflow: hidden;
`;

const Name = styled.span`
  display: flex;
  align-self: right;
  margin-top: 20px;
  font-weight: 800;
  font-size: 20px;
`;

const Button = styled.button`
  border: none;
  width: 200px;
  height: 50px;
  background: rgba(255, 84, 71, 0.7);
  &:hover {
    background: rgb(255, 0, 0);
    color: white;
  }
  margin-right: 80px;
`;

const Input = styled.input`
  display: flex;
  align-self: flex-start;
  padding: 20px;
  margin: auto;
  width: 280px;
  margin-bottom: 10px;
`;

const Tagline = styled.span``;

const Description = styled.span``;

const Beers = () => {
  const [res, setRes] = useState([]);
  const [orig, setOrig] = useState([]);
  const [page, setPage] = useState(1); 
  const [loading, setLoading] = useState(false); 
  const [text, setText] = useState("");
  const { logout } = useContext(AuthContext);
  
  const per_page = 9;

  function getNewList(current, data) {
    const resss = {}
    const ress = [...current, ...data]
    ress.forEach(item => {
      resss[item.id] = item
    })
    return Object.values(resss)
  }

  const fetchRequest = async () => {
    setLoading(true);
    const data = await fetch(
      `https://api.punkapi.com/v2/beers?page=${page}&per_page=${per_page}`
    );
    const dataJ = await data.json();
    setRes((prevRes) => getNewList(prevRes, dataJ)); // Append new data to the existing results
    setOrig((prevRes)=> getNewList(prevRes, dataJ))
    setPage(page + 1); // Increment the page number
    setLoading(false);
  };

  useEffect(() => {
    if (page < 40) {
      fetchRequest();
    }
  }, [page]);

  const handleChange = (e) => {
    const txt = e.target.value.toLowerCase();
    setText(txt);
    if (txt === "" || txt === " ") {
      setRes(orig);
    } else {
      const filteredRes = res.filter((obj) => {
        const lowerObj = obj.name.toLowerCase();
        return lowerObj.startsWith(txt);
      });
      setRes(filteredRes);
    }
    e.preventDefault();
  };

  const handleLogout = () => {
    logout();
  };
  
  let id = 1;

  return (
    <Container>
      <Row>
        <Col>
          <Input
            className="col"
            type="text"
            placeholder="Search beer..."
            onChange={handleChange}
            value={text}
          />
          <Col>
            <Button type="submit" onClick={handleLogout}>
              Log out
            </Button>
          </Col>
        </Col>
        <Col>
          {res.map((val) => (
              <Card key={id++}>
                <Img
                  className="img"
                  src={val.image_url}
                  alt="alt_description"
                  title={val.name}
                />
                <Info>
                  <Name>{val.name}</Name>
                  <Tagline>{val.tagline}</Tagline>
                  <br />
                  <br />
                  Try with: <br />
                  {val.food_pairing.map((desc) => (
                    <>
                      <Description key={val.id}>&#183; {desc}</Description>
                      <br />
                    </>
                  ))}
                </Info>
              </Card>
            )
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Beers;
