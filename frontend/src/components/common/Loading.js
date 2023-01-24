const Loading = () => {
  return (
    <>
      <div className="loader">
        <div className="ui active transition visible inverted dimmer">
          <div className="content">
            <div className="ui inverted text loader">Loading</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;
