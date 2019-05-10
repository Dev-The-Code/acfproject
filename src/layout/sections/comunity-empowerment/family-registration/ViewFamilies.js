import React, { PureComponent, Fragment } from "react";
import { List, Button, Skeleton, Card } from "antd";
import { firestore } from "../../../../firebase";
import TabCard from "../../../../components/familiesCards/TabCard";


export default class LoadMoreList extends PureComponent {
  state = {
    initLoading: true,
    loading: true,
    data: [],
    list: []
  };

  componentDidMount() {
    this.loadDocs();
  }

  async loadDocs() {
    const docRefs = await firestore.collection("families").get();

    let documents = [];
    docRefs.forEach(document => {
      documents.push({ id: document.id, ...document.data() });
    });

    this.setState(state => {
      return {
        ...state,
        initLoading: false,
        loading: false,
        list: [...documents]
      };
    });
  }

  //   componentDidMount() {
  // this.getData((res) => {
  //   this.setState({
  //     initLoading: false,
  //     data: res.results,
  //     list: res.results,
  //   });
  // });
  //   }

  //   getData = (callback) => {
  //     reqwest({
  //       url: fakeDataUrl,
  //       type: 'json',
  //       method: 'get',
  //       contentType: 'application/json',
  //       success: (res) => {
  //         callback(res);
  //       },
  //     });
  //   }

  onLoadMore = () => {
    // this.getData((res) => {
    //   const data = this.state.data.concat(res.results);
    //   this.setState({
    //     data,
    //     list: data,
    //     loading: false,
    //   }, () => {
    //     // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
    //     // In real scene, you can using public method of react-virtualized:
    //     // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
    //     window.dispatchEvent(new Event('resize'));
    //   });
    // });
  };

  render() {
    const { initLoading, loading, list, data } = this.state;
    const loadMore =
      !initLoading && !loading ? (
        <div
          style={{
            textAlign: "center",
            marginTop: 12,
            height: 32,
            lineHeight: "32px"
          }}
        >
          <Button onClick={this.onLoadMore}>Load More</Button>
        </div>
      ) : null;

    return (

      <List


        grid={{ column: 1 }}
        loading={initLoading}
        itemLayout="vertical"
        loadMore={loadMore}
        dataSource={list}
        renderItem={item => (
          <List.Item>
            <Skeleton title={true} loading={item.loading} active>
              <TabCard family={{ ...item }} />
            </Skeleton>
          </List.Item>
        )}
      />


    );
  }
}
