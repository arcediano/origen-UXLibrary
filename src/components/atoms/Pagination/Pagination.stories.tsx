import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Pagination } from "./Pagination";

const meta: Meta<typeof Pagination> = {
  title: "Atoms/Pagination",
  component: Pagination,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  render: () => {
    const [page, setPage] = React.useState(3);
    return (
      <div className="p-4 bg-white">
        <Pagination currentPage={page} totalPages={10} onPageChange={setPage} />
      </div>
    );
  },
};

export const FirstPage: Story = {
  render: () => {
    const [page, setPage] = React.useState(1);
    return (
      <div className="p-4 bg-white">
        <Pagination currentPage={page} totalPages={5} onPageChange={setPage} />
      </div>
    );
  },
};

export const LastPage: Story = {
  render: () => {
    const [page, setPage] = React.useState(5);
    return (
      <div className="p-4 bg-white">
        <Pagination currentPage={page} totalPages={5} onPageChange={setPage} />
      </div>
    );
  },
};

export const WithoutPageInfo: Story = {
  render: () => {
    const [page, setPage] = React.useState(2);
    return (
      <div className="p-4 bg-white">
        <Pagination currentPage={page} totalPages={5} onPageChange={setPage} showPageInfo={false} />
      </div>
    );
  },
};
