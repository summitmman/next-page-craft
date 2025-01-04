import PageCrafterSSR from "@/components/PageCrafterSSR";
import dynamic from "next/dynamic";

export default function Home() {
  const page = {
    data: {
      city: 'Mumbai'
    },
    schema: [
      {
        type: 'div',
        props: {
          className: 'container mx-auto px-4'
        },
        children: [
          {
            type: 'section',
            children: [
              {
                type: 'h2',
                children: [
                  'Simple native html SSR'
                ]
              },
              {
                type: 'div',
                children: [
                  'Hello world from page craft',
                  {
                    type: 'span',
                    props: {
                      className: 'block'
                    },
                    children: [
                      "Data \\\"city\\\" is { data.city }"
                    ]
                  }
                ]
              }
            ]
          },
          {
            type: 'section',
            children: [
              {
                type: 'h2',
                children: [
                  'Custom SSR component "Card"'
                ]
              },
              {
                type: 'Card',
                props: {
                  message: "Data.city: '{data.city}'"
                }
              },
            ]
          },
          {
            type: 'section',
            children: [
              {
                type: 'h2',
                children: [
                  'Custom CSR component "Input"'
                ]
              },
              {
                type: 'Input',
                props: {
                  id: 'name',
                  value: '{data.city}',
                  label: 'Enter city'
                }
              },
            ]
          },
          {
            type: 'section',
            children: [
              {
                type: 'h2',
                children: [
                  'Dynamic reactive CSR schema'
                ]
              },
              {
                type: 'clientComponent',
                state: {
                  name: 'Sumit'
                },
                children: [  
                  {
                    type: 'p',
                    children: [
                      "This section has a reactive useState 'name': {name}"
                    ]
                  },
                  {
                    type: 'label',
                    props: {
                      className: 'block',
                      htmlFor: 'name'
                    },
                    children: [
                      'Who lives in city {city}? Enter name below:'
                    ]
                  },
                  {
                    type: 'input',
                    props: {
                      id: 'name',
                      type: 'text',
                      value: '{ name }',
                      placeholder: 'Enter name who lives in { city }',
                      className: 'px-6 py-3 border-gray-700 border-2 rounded'
                    },
                    events: {
                      onChange: '{ handleNameChange }',
                    }
                  },
                  {
                    type: 'p',
                    children: [
                      '{ name } lives in city { city }'
                    ]
                  }
                ]
              },
            ]
          }
        ]
      },
    ]
  };

  const componentMap = {
    'Card': dynamic(() => import('@/components/Card')),
    'Input': dynamic(() => import('@/components/Input'))
  };

  return (
    <PageCrafterSSR page={page} componentMap={componentMap} />
  );
}
