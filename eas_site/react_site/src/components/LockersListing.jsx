import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetch_url } from "../config.json";
import "../css/listing.css";

function LockersListing() {
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
        body: JSON.stringify({ collection: "lockers" }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const query_result = JSON.parse((await response.json()).data);
      getBlocks(query_result);
    }
    fetchData();
  }, []);

  return (
    <>
      {!selectedBlock && (
        <>
          <h1 class="section-title">Listado de casilleros disponibles</h1>
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
            Listado de casilleros para el bloque {selectedBlock}:
          </h2>
          <section id="listado">
            {blockList[selectedBlock].map((blockElem) => {
              return <BlockItem block={blockElem} />;
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

function BlockItem({ block }) {
  return (
    <Link
      to="/reserve_lockers"
      state={{ from: block }}
      style={{ "text-decoration": "none", color: "var(--white)" }}
      onClick={(e) => {
        !block.Availability && e.preventDefault();
      }}
    >
      <article className="item-listado">
        <div className="item-block">
          <p>{block.Block}</p>
        </div>
        <div className="item-info">
          <h4>Casillero {block.Locker}</h4>
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

export default LockersListing;
