/**
 * Custom brand icons not available in lucide-react.
 * For all standard icons (ExternalLink, ArrowRight, Mail, Play, X, Youtube, etc.)
 * import directly from lucide-react.
 */

interface IconProps {
  className?: string
}

export function GitHubIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

export function LinkedInIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

// export function YoutubeIcon({ className }: IconProps) {
//   return (
//     <svg
//       xmlns:dc="http://purl.org/dc/elements/1.1/"
//       xmlns:cc="http://creativecommons.org/ns#"
//       xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
//       xmlns:svg="http://www.w3.org/2000/svg"
//       xmlns="http://www.w3.org/2000/svg"
//       xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
//       xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
//       version="1.1"
//       id="svg2"
//       xml:space="preserve"
//       width="234.66667"
//       height="165.33333"
//       viewBox="0 0 234.66667 165.33333"
//       xmlns:xlink="http://www.w3.org/1999/xlink"
//     >
//       <metadata id="metadata8">
//         <rdf:RDF>
//           <cc:Work rdf:about="">
//             <dc:format>image/svg+xml</dc:format>
//             <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"></dc:type>
//           </cc:Work>
//         </rdf:RDF>
//       </metadata>
//       <defs id="defs6"></defs>
//       <sodipodi:namedview
//         pagecolor="#ffffff"
//         bordercolor="#666666"
//         borderopacity="1"
//         objecttolerance="10"
//         gridtolerance="10"
//         guidetolerance="10"
//         inkscape:pageopacity="0"
//         inkscape:pageshadow="2"
//         inkscape:window-width="640"
//         inkscape:window-height="480"
//         id="namedview4"
//       ></sodipodi:namedview>
//       <g
//         id="g10"
//         inkscape:groupmode="layer"
//         inkscape:label="ink_ext_XXXXXX"
//         transform="matrix(1.3333333,0,0,-1.3333333,0,165.33333)"
//       >
//         <g id="g12" transform="scale(0.1)">
//           <path
//             d="m 1723.22,1046.37 c -20.24,76.22 -79.87,136.24 -155.6,156.61 C 1430.37,1240 880,1240 880,1240 c 0,0 -550.367,0 -687.621,-37.02 C 116.656,1182.61 57.0156,1122.59 36.7773,1046.37 0,908.227 0,620 0,620 0,620 0,331.777 36.7773,193.621 57.0156,117.41 116.656,57.3906 192.379,37.0117 329.633,0 880,0 880,0 c 0,0 550.37,0 687.62,37.0117 75.73,20.3789 135.36,80.3983 155.6,156.6093 C 1760,331.777 1760,620 1760,620 c 0,0 0,288.227 -36.78,426.37"
//             style="fill:#ed1d24;fill-opacity:1;fill-rule:nonzero;stroke:none"
//             id="path14"
//           ></path>
//           <path
//             d="m 700,358.313 460,261.675 -460,261.7 z"
//             style="fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
//             id="path16"
//           ></path>
//         </g>
//       </g>
//     </svg>
//   )
// }
