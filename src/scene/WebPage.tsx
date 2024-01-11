import { Html } from '@react-three/drei'
import React, { useContext } from 'react'
import { currentSceneContext } from '../context/CurrentSceneContext.tsx'
import { useScreenResize } from '../hooks/useScreenResize.tsx'
import { HtmlPage } from './htmlPage/HtmlPage.tsx'
import { sceneContext } from '../context/SceneContext.tsx'

export function WebPage() {
  const { blending, planeInfo, smallRatio } = useScreenResize()
  const currentScene = useContext(currentSceneContext)
  const { setScene } = useContext(sceneContext)

  return (
    //TODO For opti And update drei stop blending and replace by smooth opacity to 0 into cut off
    <>
      {Math.abs(currentScene) < 2 && (
        <Html
          position={[0, 0, -0.5]}
          transform={true}
          occlude={blending ? 'blending' : false}
          wrapperClass="htmlScreen"
          distanceFactor={1}
          style={{
            width: planeInfo.width,
            height: planeInfo.height,
          }}
        >
          <HtmlPage
            htmlHeight={planeInfo.height}
            smallRatio={smallRatio}
            setScene={setScene}
          />
        </Html>
      )}
    </>
  )
}

{
  /* <iframe src="https://bruno-simon.com/html/" /> */
}

function TestHtml() {
  return (
    <div className="htmlScreen">
      <nav>
        <div className="nav__content">
          <img
            src="https://assets.codepen.io/605876/bear-2022--white.png"
            alt=""
          />
          <a
            href="https://twitter.com/intent/follow?screen_name=jh3yy"
            target="_blank"
          >
            Follow
          </a>
        </div>
      </nav>
      <section>
        <div className="section__content">
          <svg>
            <text
              x="50%"
              y="50%"
              dominant-baseline="middle"
              text-anchor="middle"
            >
              Your Name
            </text>
          </svg>
        </div>
      </section>
      <section>
        <video
          src="https://assets.codepen.io/605876/chameleon.mp4"
          autoplay
          playsinline
          muted
          loop
        ></video>
        <div className="section__content">
          <p>
            Animations that run off the main thread. That can be driven by
            either the scroll position of a container or an element's position
            within a container! No JavaScript.
            <br />
            Pretty cool.
          </p>
        </div>
      </section>
      <section>
        <div className="section__content">
          <h2>fin.</h2>
          <svg
            aria-hidden="true"
            className="ml-6 w-1/4"
            stroke="var(--text-1)"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 271 209"
          >
            <title>Jhey</title>
            <path
              d="M144.745 123.82c1.907-1.258-3.266-2.199-4.184-2.418-4.076-.973-15.825-2.609-16.141 4.319-.725 15.907 36.347 5.736 16.072-3.986M102.952 112.797c-5.6848 0-6.2149 7.73-.728 7.12 6.139-.682 3.185-9.905-1.861-6.877M170.025 108.347c-1.398-2.796-7.244 2.284-4.531 6.23 2.713 3.946 8.442-.486 6.149-4.612-.608-1.094-3.096-2.133-4.288-1.537M117.998 100.704c0-9.5524-14.086-13.3378-21.4395-11.3323-11.7769 3.2119-15.927 9.6813-15.927 21.1333M187.183 101.246C182.107 82.5407 155.739 77.9455 151.5 99"
              stroke-width="5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M40.3725 26.8984C58.6558 41.1564 141.659 43.1867 128.248 5.48254c-.337-.94488-1.163-3.24224-2.31-3.47304-1.224-.24653-4.009 4.38498-4.311 4.81425C100.965 36.1863 95.2641 73.5992 74.5923 102.644c-10.8878 15.298-59.8032 43.034-69.03244 10.837C-17.5939 32.705 78.7483 76.0672 105.741 67.4678c14.016-4.4657 19.556-16.7853 27.09-28.3056 2.387-3.6496 4.797-14.5469 7.212-10.9155 4.728 7.1114-20.401 41.6294-24.484 50.2225-4.6 9.679 13.669-31.7231 21.237-24.1359 9.433 9.4564-8.56 28.4026 16.571 7.3471 4.267-3.5745 13.215-15.2775 7.666-14.8349-7.056.563-19.468 20.1743-9.348 23.1872 9.846 2.9308 24.354-31.3131 22.327-21.2426-1.003 4.9789-5.669 18.5794 1.966 20.1168 10.559 2.1259 15.596-33.041 21.559-24.071C240.356 109.24 81.7126 283.324 50.2184 167.261 25.2159 75.1229 240.563 89.2082 268.88 137.08"
              stroke-width="5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </div>
      </section>
    </div>
  )
}
