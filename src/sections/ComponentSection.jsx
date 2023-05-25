import React, { useEffect, useState } from 'react'
import Component from '../components/Component'
import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { loadingState, subjectState, sortBySugang, sortByLike } from '../state/state';
import { Dimmer, Loader, Pagination, Segment } from 'semantic-ui-react';

const ComponentContainer = styled.div`
    display: flex;
    flex-direction : column;
    gap : 5rem;
    margin-top : 5em;
`

export const ComponentSection = () => {
  const itemsPerPage = 10;
  const loading = useRecoilValue(loadingState);

  const data = useRecoilValue(subjectState);
  const setData = useSetRecoilState(subjectState);
  const [activePage, setActivePage] = useState(1);
  const [displayedData, setDisplayedData] = useState(data.slice(0, itemsPerPage));

  const sugangSort = useRecoilValue(sortBySugang);
  const likeSort = useRecoilValue(sortByLike);

  console.log(data);

  useEffect(() => {
    setDisplayedData(data.slice(0, itemsPerPage))
  },[data]);

  useEffect(() => {
    // sortedData 만들기 (전역으로 할 필요 있나? 여기서 처리하면 되니까 상관없을듯.)
    sugangSort ? {
      const sortedData = data.sort(())
    } : data;

    likeSort ? {} : data;
  }, [sugangSort, likeSort]);

  const handlePageChange = (event, { activePage }) => {
    setActivePage(activePage);
    const startIndex = (activePage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setDisplayedData(data.slice(startIndex, endIndex));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ComponentContainer>
      {!loading ?
        (<>
          {
            displayedData.map((component) => (
              <Component component={component} />
            ))}
            <div style={{ width: "100%", justifyContent : "center", display: "flex", marginBottom: "3em" }}>
            <Pagination activePage={activePage} totalPages={Math.ceil(data.length / itemsPerPage)} onPageChange={handlePageChange}/>
          </div>
        </>
        ) : (
          <Dimmer active inverted>
            <Loader size="big" inverted>Loading</Loader>
          </Dimmer>
        )
      }
    </ComponentContainer>
  )
}
