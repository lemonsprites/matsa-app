import CreatableSelect from 'react-select/creatable';
import { useState } from 'react';
import { ActionMeta, MultiValue } from 'react-select';

type TagOption = {
    label: string;
    value: string;
};

const dummyTags: TagOption[] = [
    { label: 'Berita', value: 'berita' },
    { label: 'Pengumuman', value: 'pengumuman' },
    { label: 'Event', value: 'event' },
];

export default function ArtikelTagInput({ value, onChange }: any) {
    const [tags, setTags] = useState<TagOption[]>([]);
    const [allOptions, setAllOptions] = useState<TagOption[]>(dummyTags);

    const handleChange = (
        newValue: MultiValue<TagOption>,
        _actionMeta: ActionMeta<TagOption>
    ) => {
        setTags([...newValue]);
    };

    const handleCreate = (inputValue: string) => {
        const newOption = {
            label: inputValue,
            value: inputValue.toLowerCase().replace(/\s+/g, '-'),
        };
        setAllOptions((prev) => [...prev, newOption]);
        setTags((prev) => [...prev, newOption]);
    };

    return (
        <div>
            <CreatableSelect
                isMulti
                value={tags}
                options={allOptions}
                onChange={handleChange}
                onCreateOption={handleCreate}
                placeholder="Pilih atau buat tag..."
                classNamePrefix="tag"
                styles={{
                    control: (base) => ({
                        ...base,
                        minHeight: '2.5rem',
                        fontSize: '0.875rem',
                    }),
                    multiValue: (base) => ({
                        ...base,
                        backgroundColor: '#e5e7eb',
                        borderRadius: '0.375rem',
                    }),
                    multiValueLabel: (base) => ({
                        ...base,
                        color: '#111827',
                    }),
                    multiValueRemove: (base) => ({
                        ...base,
                        color: '#6b7280',
                        ':hover': {
                            backgroundColor: '#d1d5db',
                            color: '#111827',
                        },
                    }),
                }}
            />

            {/* <pre className="mt-4 bg-gray-100 p-2 rounded text-xs">
                {JSON.stringify(tags, null, 2)}
            </pre> */}
        </div>
    );
}
