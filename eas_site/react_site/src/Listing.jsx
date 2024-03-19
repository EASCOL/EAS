import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetch_url } from "./config.json";
import "./css/listing.css";

// This component lists classrooms and lockers
// The only difference is name / and no capacity from lockers.

function Listing({ query_type }) {
  const [selectedBlock, setBlock] = useState(null);
  const [blockList, setBlockList] = useState({});

  function getBlocks(data) {
    const blocks = {};

    data.forEach((elem) => {
      if (!Object.hasOwn(blocks, elem.Block)) blocks[elem.Block] = [];

      blocks[elem.Block].push(elem);
    });

    setBlockList(blocks);
  }

  useEffect(() => {
    // If query type changes, reset states
    setBlockList({});
    setBlock(null);

    async function fetchData() {
      const response = await fetch(`${fetch_url}/get`, {
        method: "POST",
        body: JSON.stringify({ collection: query_type }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const query_result = JSON.parse((await response.json()).data);
      getBlocks(query_result);
    }
    fetchData();
  }, [query_type]);

  return (
    <>
      {!selectedBlock && (
        <>
          <h1 class="section-title">
            Listado de {query_type == "classrooms" ? "aulas" : "casilleros"}{" "}
            disponibles
          </h1>
          <section id="bloques">
            {Object.keys(blockList).map((block) => {
              return (
                <Block
                  blocks={blockList}
                  blockNumber={block}
                  chooseBlock={setBlock}
                />
              );
            })}
          </section>
        </>
      )}

      {selectedBlock && (
        <>
          <h2 class="section-title">
            Listado de {query_type == "classrooms" ? "aulas" : "casilleros"}{" "}
            para el bloque {selectedBlock}:
          </h2>
          <section id="listado">
            {blockList[selectedBlock].map((blockElem) => {
              return <BlockItem block={blockElem} query_type={query_type} />;
            })}
          </section>
        </>
      )}
    </>
  );
}

function Block({ blocks, blockNumber, chooseBlock }) {
  function checkAvailability() {
    let available = 0;

    blocks[blockNumber].forEach((elem) => {
      if (elem.Availability) available += 1;
    });

    return `${available}/${blocks[blockNumber].length}`;
  }

  return (
    <article
      class="bloque"
      onClick={() => {
        chooseBlock(blockNumber);
      }}
    >
      <img
        src="https://thumbs.dreamstime.com/b/d-rendering-architectural-blocks-empty-room-grid-texture-black-white-abstract-minimal-background-d-render-architectural-141798661.jpg"
        alt="Foto de bloque"
      />
      <div class="bloque-info">
        <h4>Bloque {blockNumber}</h4>
        <p>Actualmente hay {checkAvailability()} disponibles</p>
      </div>
    </article>
  );
}

function BlockItem({ block, query_type }) {
  return (
    <Link
      to="/reserve"
      state={{ from: block, query_type }}
      style={{ "text-decoration": "none", color: "var(--white)" }}
    >
      <article className="item-listado">
        <div className="item-block">
          <p>{block.Block}</p>
        </div>
        <div className="item-info">
          <h4>
            {query_type == "classrooms" ? "Aula" : "Casilleros"}{" "}
            {block.Classroom}
          </h4>
          <p className="item-info-small">
            Estado:{" "}
            {block.Availability ? (
              <span className="available">Disponible</span>
            ) : (
              <span className="occupied">Ocupado</span>
            )}
          </p>
        </div>
      </article>
    </Link>
  );
}

export default Listing;
