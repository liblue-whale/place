export const homePreviewVariants = ["zine", "paper"] as const

export type HomePreviewVariant = (typeof homePreviewVariants)[number]

export const homePreviewLabels: Record<HomePreviewVariant, string> = {
    zine: "Zine",
    paper: "Paper",
}

export const homePreviewContent = {
    about: [
        "Liblue is a small personal studio for things I read, think, and write.",
        "Mathematics, literature, engineering, and the spaces between them.",
    ],
    now: [
        {
            label: "Thinking",
            text: "How different ways of learning change the shape of an idea.",
        },
        {
            label: "Reading",
            text: "A book left open, with a few lines still following me.",
        },
        {
            label: "Writing",
            text: "Notes that may become essays, records, or unfinished questions.",
        },
    ],
    links: [
        {
            label: "About me",
            description: "A little more about the person behind this place.",
            href: "/About_me",
        },
        {
            label: "Articles",
            description: "Essays, reading notes, and records in progress.",
            href: "/articles",
        },
        {
            label: "Works",
            description: "Things made through study and experiment.",
            href: "/Works",
        },
        {
            label: "Contact",
            description: "A way to reach me from outside this small studio.",
            href: "/Contact",
        },
    ],
} as const
